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

   #projectPoint(p, seg, { width, height }) {
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

   render(ctx, points, slenderMan) {
      const items = points.map((p) => ({
         point: p,
         dist: distance(this.center, p),
         type: "tree",
      }));
      if (slenderMan) {
         items.push({
            point: slenderMan.center,
            dist: distance(this.center, slenderMan.center),
            type: "slenderMan",
         });
      }
      items.sort((a, b) => b.dist - a.dist);

      const seg = [this.center, this.front];
      const projections = items.map((p) => {
         return {
            point: this.#projectPoint(p.point, seg, ctx.canvas),
            dist: p.dist,
            type: p.type,
         };
      });

      for (let i = 0; i < projections.length; i++) {
         const proj = projections[i];
         if (proj.type === "tree") {
            Tree.render(ctx, proj.point, proj.dist);
         } else {
            SlenderMan.render(ctx, proj.point, proj.dist);
         }
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
