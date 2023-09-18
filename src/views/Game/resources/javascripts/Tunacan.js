import Prop from './Prop';

class Tuna_can extends Prop {

  constructor(ctx, max_width, max_height, images) {
    super(ctx, max_width, max_height, images, 50, 50, 4, 'tuna_can', true);
  }

  update() {
    if (this.collided || this.y > this.max_height) {
      return true;
    }

    this.y += this.speed;
  }
}

export default Tuna_can;