class Game {
   constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");

      const center = {
         x: canvas.width / 2,
         y: canvas.height / 2,
      };

      this.player = new Player(center);

   }

   start() {
      this.animate();
   }

   animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.player.update();
      this.player.draw(this.ctx);
      requestAnimationFrame(() => this.animate());
   }
}
