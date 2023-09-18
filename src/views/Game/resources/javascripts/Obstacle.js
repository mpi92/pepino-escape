import Prop from './Prop';

class Obstacle extends Prop {

  constructor(ctx, max_width, max_height, images) {
    super(ctx, max_width, max_height, images, 50, 150, 6, 'obstacle', false);
  }

  invert() {
    return new Promise((resolve) => {
      const currentSpeed = this.speed;
      const nextInvertedStatus = !this.inverted;
      let reducing = true;
  
      const invertAction = setInterval(() => {
        if (reducing) {
          this.speed -= 0.1;
  
          if (this.speed < 0) {
            reducing = false;
          }
          return;
        }
  
        if (this.inverted !== nextInvertedStatus) {
          this.inverted = nextInvertedStatus;
        }
  
        if (this.speed < currentSpeed) {
          this.speed += 0.1;
          return;
        }

        clearInterval(invertAction);
        resolve(true);
      }, 10);
    });
  }

  updateInverted() {
    if (this.y < 0) {
      this.y = this.start_position_inverted;
      this.x = this.random_x();

      this.speed += 0.1;
      return true;
    }

    this.y -= this.speed;
  }

  update() {
    if (this.inverted) {
      return this.updateInverted();
    }

    if (this.y > this.max_height) {
      this.y = this.start_position;
      this.x = this.random_x();

      this.speed += 0.1;
      return true;
    }

    this.y += this.speed;
  }
}

export default Obstacle;