class Player {
  
  constructor(canvas, ctx, x, y, images, sounds) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.images = images;
    this.sounds = sounds;

    this.width = 80;
    this.height = 200;
    this.lives = 3;
    this.score = 0;
    
    this.player_fire_anim_frame = 0;
    
    this.get_loaded_data();
  }
  
  get_loaded_data() {
    // Set images
    this.player_main_image = this.images.filter(img => img.target === 'player_main')[0].image;
    this.player_fire_anim = this.images.filter(img => img.target === 'player_fire')[0].image;
    
    // Set sounds
    this.meow = this.sounds.filter(snd => snd.target === 'meow')[0].audio;
    this.tuna_can = this.sounds.filter(snd => snd.target === 'tuna_can')[0].audio;
  }

  update(event) {
    // this = canvas element
    const rect = this.canvas.getBoundingClientRect();
    
    this.x = event.clientX - rect.left;
    this.y = event.clientY - rect.top;
  }

  draw_fire() {
    const cut_position = this.player_fire_anim_frame * 140;
    const fire_x = this.x - 30;
    const fire_y = this.y + 55;

    if (this.player_fire_anim_frame === 11) {
      this.player_fire_anim_frame = 0;
    }

    this.ctx.drawImage(this.player_fire_anim,
      cut_position, 0, 140, 500,
      fire_x, fire_y, 50, 200);

    this.player_fire_anim_frame++;
  }

  draw() {
    //this.update();
    this.ctx.drawImage(this.player_main_image,
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width, this.height);
      this.draw_fire();
  }
}

export default Player;