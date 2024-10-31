class Camera {
   constructor(center, target) {
      this.center = center;
      this.target = target;
      this.maxViewDistance = 1000;
      this.fovAngle = Math.PI / 2;
      this.z = -150;
   }

   update() {
      this.center = this.target.center;
      const frontOffset = Vector.fromPolar(
         this.target.dir,
         this.maxViewDistance
      );
      this.front = Vector.add(this.center, frontOffset);
      const leftOffset = Vector.fromPolar(
         this.target.dir - this.fovAngle / 2,
         this.maxViewDistance
      );
      this.left = Vector.add(this.center, leftOffset);
      const rightOffset = Vector.fromPolar(
         this.target.dir + this.fovAngle / 2,
         this.maxViewDistance
      );
      this.right = Vector.add(this.center, rightOffset);
      return [this.left, this.center, this.right];
   }

   render(ctx, points) {
      const seg = [this.center, this.front];
      for (const p of points) {
         const p1 = projectPoint(p, seg);
         const c = Vector.cross(
            Vector.subtract(p1, this.center),
            Vector.subtract(p, this.center)
         );
         const x = (Math.sign(c) * distance(p, p1)) / distance(this.center, p1);
         const y = -this.z / distance(this.center, p1); // can use p instead of p1
         const cX = ctx.canvas.width / 2;
         const cY = ctx.canvas.height / 2;
         const scaler = Math.min(cX, cY);
         const scaledX = cX + x * scaler;
         const scaledY = cY + y * scaler;
         ctx.beginPath();
         ctx.arc(scaledX, scaledY, 5, 0, Math.PI * 2);
         ctx.fill();
      }
   }
   draw(ctx) {
      ctx.beginPath();
      ctx.moveTo(this.left.x, this.left.y);
      ctx.lineTo(this.center.x, this.center.y);
      ctx.lineTo(this.right.x, this.right.y);
      ctx.closePath();
      ctx.strokeStyle = "cyan";
      ctx.stroke();
   }
}
