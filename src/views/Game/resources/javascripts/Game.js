import Player from './Player';
import Tuna_can from './Tunacan';
import Obstacle from './Obstacle';
import GravityBall from './GravityBall';
import PepinoChecker from './PepinoChecker';

class Game {
  constructor({ canvas, images, sounds, onEnd, onInterrupt }) {
    this.ctx = canvas.getContext('2d');
    this.max_width = Number(canvas.getAttribute('width'));
    this.max_height = Number(canvas.getAttribute('height'));
    this.onEnd = onEnd;
    this.onInterrupt = onInterrupt;
    this.images = images;
    this.sounds = sounds;
    this.canvas = canvas;
    this.pepinoChecker = new PepinoChecker();

    this.player = new Player(this.canvas, this.ctx, this.max_width/2, this.max_height/2, this.images, this.sounds);

    this.obstacles = [];
    this.tuna_can;
    this.gravityBall;
    this.elapsed = 0;

    this.collected = {
      tunaCans: 0,
      gravityBalls: 0,
    };

    this.load();
  }
  
  load() {
    const game_bg = this.images.filter(img => img.target === 'game_bg')[0].image;

    this.canvas.style.backgroundImage = `url("${game_bg.src}")`;
  }
  
  init() {
    this.make_it_rain();
    this.frame({});
    this.canvas.addEventListener('mousemove', e => this.player.update(e));
  }

  // DRAW FUNCTIONS ==============================================

  clear_screen() {
    this.ctx.clearRect(0, 0, this.max_width, this.max_height);
  }

  draw_stats() {
    this.ctx.fillStyle = 'white';
    this.ctx.font = '40px Play';
    this.ctx.fillText('Lives: ' + this.player.lives, 30, 40);
    this.ctx.fillText('Score: ' + this.player.score, this.max_width - 230, 40);
  }

  draw() {
    this.clear_screen();
    this.obstacles.forEach((obstacle) => {
      this.collision_check(obstacle);

      if (obstacle.update()) {
        this.player.score += 10;
      }
      
      obstacle.draw();
    });
    
    if (this.elapsed && this.elapsed % 35 === 0 && !this.tuna_can) {
      this.make_tuna_can();
    }

    if (this.elapsed && this.elapsed % 60 === 0 && !this.gravityBall) {
      this.make_gravity_ball();
    }

    if (this.gravityBall) {
      this.collision_check(this.gravityBall);

      if (this.gravityBall.update()) {
        this.gravityBall = undefined;
        this.collected.gravityBalls += 1;
      } else {
        this.gravityBall.draw();
      }
    }
    
    if (this.tuna_can) {
      this.collision_check(this.tuna_can);

      if (this.tuna_can.update()) {
        this.tuna_can = undefined;
        this.collected.tunaCans += 1;
      } else {
        this.tuna_can.draw();
      }
    }

    this.player.draw();
    this.draw_stats();
  }

  // MAIN FRAMES FUNCTION =============================================
  frame({
    ended = this.player.lives === 0,
    interrupted = false,
  }) {
    if (ended) {
      this.onEnd({
        score: this.player.score,
        elapsed: this.elapsed,
        collected: this.collected,
      });
      window.clearInterval(this.interval_id);
      this.canvas.removeEventListener('mousemove', this.player.update);
      return;
    }

    if (interrupted) {
      this.onInterrupt();
      window.clearInterval(this.interval_id);
      this.canvas.removeEventListener('mousemove', this.player.update);
      return;
    }

    this.draw();
  
    window.requestAnimationFrame((ts) => {
      const checkResults = this.pepinoChecker.check(ts);

      if (checkResults.interrupted) {
        window.clearInterval(this.interval_id);
      }

      this.elapsed = checkResults.elapsed;

      this.frame({
        interrupted: checkResults.interrupted,
      });
    });
  }

  // OBSTACLES ========================================================

  make_it_rain() {
    const make_obstacle = () => {
      const obstacle = new Obstacle(this.ctx, this.max_width, this.max_height, this.images);
      this.obstacles.push(obstacle);

      if (this.obstacles.length === 8) {
        window.clearInterval(this.interval_id);
      }
    }

    this.interval_id = window.setInterval(make_obstacle, 3000);
  }

  make_tuna_can() {
    const tuna_can = new Tuna_can(this.ctx, this.max_width, this.max_height, this.images);
    this.tuna_can = tuna_can;
  }

  make_gravity_ball() {
    const gravityBall = new GravityBall(this.ctx, this.max_width, this.max_height, this.images);
    this.gravityBall = gravityBall;
  }

  // COLLISIONS =========================================================

  collision_check(prop) {
    const collides_right = prop.x - prop.width  / 2 + 35 < this.player.x + this.player.width / 2;
    const collides_left = prop.x + prop.width / 2 - 15> this.player.x - this.player.width / 2;
    const collides_top = prop.y - prop.height / 2  + 15 < this.player.y + this.player.height / 2;
    const collides_bottom = prop.y + prop.height / 2 - 15 > this.player.y - this.player.height / 2;

    if (collides_left && collides_right && collides_top && collides_bottom) {

      // if (!document.querySelector('#audio_element').muted) {
      //   if (prop.type === 'obstacle') {
      //     this.player.meow.play();
      //     this.player.meow.currentTime = 0.2;
      //   } else if (prop.type === 'tuna_can') {
      //     this.player.tuna_can.play();
      //     this.player.tuna_can.currentTime = 0.2;
      //   }
      // }

      // obstacle
      switch (prop.type) {
        case 'obstacle':
          prop.x = prop.random_x();
          prop.y = prop.start_position;
          this.player.lives = Math.max(this.player.lives - 1, 0);
    
          this.ctx.fillStyle = 'rgb(143, 0, 0)';
          this.ctx.fillRect(0, 0, this.max_width, this.max_height);
          break;
        case 'tuna_can':
          this.tuna_can.collided = true;
          this.player.lives += 1;
  
          this.ctx.fillStyle = 'rgb(0, 143, 0)';
          this.ctx.fillRect(0, 0, this.max_width, this.max_height);
          break;
        case 'gravity_ball':
          this.gravityBall.collided = true;
          this.player.score += 500;
  
          this.ctx.fillStyle = 'rgb(0, 0, 143)';
          this.ctx.fillRect(0, 0, this.max_width, this.max_height);

          this.obstacles.forEach((obstacle) => {
            if (Math.floor(Math.random() * 11) % 2 === 0) {
              obstacle.invert();
            }
          });
        default: break;
      }
    }
  }
}

export default Game;