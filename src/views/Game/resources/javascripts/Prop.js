class Prop {
  constructor(ctx, max_width, max_height, images, width, height, speed, type, animate) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.type = type;

    this.max_width = max_width;
    this.max_height = max_height;
    this.images = images;

    this.inverted = false;
    this.start_position = 0 - this.height / 2;
    this.start_position_inverted = this.max_height + this.height / 2;

    this.x = this.random_x();
    this.y = this.inverted ? this.start_position_inverted : this.start_position;

    this.get_loaded_data();

    if (animate) {
      this.rotation = 'left';
      this.animate();
    }
  }

  animate() {
    setInterval(() => {
      this.rotation = this.rotation === 'left' ? 'right' : 'left';
    }, 750);
  }

  get_loaded_data() {
    // Set images
    this.image = this.images.filter(img => img.target === this.type)[0].image;
  }

  random_x() {
    return Math.floor(Math.random() * this.max_width);
  }

  draw() {  
    if (this.animate) {
      this.ctx.save();
      this.ctx.translate(this.x, this.y);
      if (this.rotation === 'left') {
        // rotate 45 degrees left
        this.ctx.rotate(Math.PI / -8);
      } else if (this.rotation === 'right') {
        this.ctx.rotate(Math.PI / 16);
      }
      this.ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
      this.ctx.restore();
      return;
    }
    this.ctx.drawImage(this.image,
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width, this.height);
  }
}

export default Prop;