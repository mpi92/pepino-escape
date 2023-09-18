import Prop from './Prop';

class GravityBall extends Prop {

  constructor(ctx, max_width, max_height, images) {
    super(ctx, max_width, max_height, images, 50, 50, 3, 'gravity_ball', true);
  }

  update() {
    if (this.collided || this.y > this.max_height) {
      return true;
    }

    this.y += this.speed;
  }
}

export default GravityBall;