class Camera {
   static maxViewDistance = 1000;
   constructor(center, target) {
      this.center = center;
      this.target = target;
      this.fovAngle = Math.PI * 0.5;
      this.z = -50;
   }

   update() {
      this.center = this.target.center;
      const frontOffset = Vector.fromPolar(
         this.target.dir,
         Camera.maxViewDistance
      );
      this.front = Vector.add(this.center, frontOffset);
      const leftOffset = Vector.fromPolar(
         this.target.dir - this.fovAngle / 2,
         Camera.maxViewDistance
      );
      this.left = Vector.add(this.center, leftOffset);
      const rightOffset = Vector.fromPolar(
         this.target.dir + this.fovAngle / 2,
         Camera.maxViewDistance
      );
      this.right = Vector.add(this.center, rightOffset);
      return [this.left, this.center, this.right];
   }

   #projectPoint(p, seg, {width,height}) {
      const p1 = projectPoint(p, seg);
      const c = Vector.cross(
         Vector.subtract(p1, this.center),
         Vector.subtract(p, this.center)
      );
      const x = (Math.sign(c) * distance(p, p1)) / distance(this.center, p1);
      const y = -this.z / distance(this.center, p); // can use p instead of p1
      const cX = width / 2;
      const cY = height / 2;
      const scaler = Math.max(cX, cY);
      const scaledX = cX + x * scaler;
      const scaledY = cY + y * scaler;
      return { x: scaledX, y: scaledY };
   }

   render(ctx, points) {
      points.sort((a, b) => distance(this.center, b) - distance(this.center, a));

      const seg = [this.center, this.front];
      const projections=points.map(p=>this.#projectPoint(p, seg, ctx.canvas));

      for(let i=0;i<points.length;i++){
         const proj=projections[i];
         const dist=distance(this.center,points[i]);
         Tree.render(ctx, proj, dist);
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
