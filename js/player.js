class Player {
   constructor(center) {
      this.center = center;
      this.size = 50;

      this.dir = -Math.PI / 2;
      this.speed = 0;
      this.maxSpeed = 5;
      this.friction = 0.4;
      this.directionChange = 0.05;
      this.speedChange = 0.6;
      this.epsilon = 0.01;

      this.controls = new Controls();
   }

   update() {
      const { left, right, up, down } = this.controls;

      if (left) {
         this.dir -= this.directionChange;
      }
      if (right) {
         this.dir += this.directionChange;
      }
      if (up) {
         this.speed += this.speedChange;
      }
      if (down) {
         this.speed -= this.speedChange;
      }

      if (this.speed > 0) {
         this.speed -= this.friction;
      } else if (this.speed < 0) {
         this.speed += this.friction;
      }

      if (Math.abs(this.speed) < this.epsilon) {
         this.speed = 0;
      }

      if (this.speed > this.maxSpeed) {
         this.speed = this.maxSpeed;
      } else if (this.speed < -this.maxSpeed) {
         this.speed = -this.maxSpeed;
      }

      this.center.x += Math.cos(this.dir) * this.speed;
      this.center.y += Math.sin(this.dir) * this.speed;
   }

   draw(ctx) {
      const { center, size } = this;
      const radius = size / 2;
      ctx.save();
      ctx.translate(center.x, center.y);
      ctx.rotate(this.dir + Math.PI / 2);

      ctx.beginPath();
      ctx.moveTo(0, -radius);
      ctx.arc(0, 0, radius, 0, Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();

      ctx.restore();
   }
}
