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

   update() {
      const { ctx, canvas } = this;
      this.player.draw(ctx);
   }
}
