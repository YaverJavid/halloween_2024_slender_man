class Tree {
   static height = 200000;
   constructor(center) {
      this.center = center;
      this.size = 50;
   }

   static render(ctx, center, distanceToTree) {
      const radius = 30000;
      const scaledHeight = Tree.height / distanceToTree;
      const topWidth = radius / distanceToTree;

      // top triangle
      let height = scaledHeight * 0.9;
      let width = topWidth;

      const hue = 120;
      const lightness1 = (1 - distanceToTree / Camera.maxViewDistance) * 20;
      const lightness2 = (1-Math.abs(center.x-ctx.canvas.width/2)/ctx.canvas.width*2)*20;
      const lightness =  Math.min(lightness1, lightness2);

      ctx.save();
      ctx.translate(center.x, center.y);
      ctx.beginPath();
      ctx.lineWidth = 6000 / distanceToTree;
      ctx.strokeStyle = `hsl(${hue}, 100%, ${lightness}%)`;
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -width);
      ctx.stroke();

      for (let i = 1; i <= 5; i++) {
         ctx.beginPath();
         ctx.moveTo(0, -scaledHeight + height / 2);
         ctx.lineTo(-width, -scaledHeight + height);
         ctx.lineTo(width, -scaledHeight + height);
         ctx.closePath();
         ctx.fillStyle = `hsl(${hue}, 100%, ${lightness}%)`;
         ctx.fill();
         ctx.stroke();
         width *= 0.9;
         height *= 0.85;
      }

      ctx.restore();
   }

   draw(ctx) {
      const { center, size } = this;
      const radius = size / 2;
      ctx.save();
      ctx.translate(center.x, center.y);
      ctx.strokeStyle = "lime";
      ctx.beginPath();
      ctx.moveTo(0, -radius);
      ctx.lineTo(0, radius);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-radius, 0);
      ctx.lineTo(radius, 0);
      ctx.stroke();
      ctx.restore();
   }
}
