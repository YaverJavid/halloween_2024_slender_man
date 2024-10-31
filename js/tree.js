class Tree{
   constructor(center){
      this.center = center;
      this.size = 50;
   }
   
   draw(ctx){
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