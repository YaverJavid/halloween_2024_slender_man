function lerp(a, b, t) {
   return a + (b - a) * t;
}

function distance(a, b) {
   return Math.hypot(a.x - b.x, a.y - b.y);
}

function projectPoint(point, segment) {
   const [p1, p2] = segment;
   const a = Vector.subtract(point, p1);
   const b = Vector.subtract(p2, p1);
   const normB = Vector.normalize(b);
   const scaler = Vector.dot(a, normB);
   const proj = {
      point: Vector.add(p1, Vector.scale(normB, scaler)),
      offset: scaler / Vector.magnitude(b),
   };
   return proj.point;
}


// Point in triangle source
// https://stackoverflow.com/questions/2049582/how-to-determine-if-a-point-is-in-a-2d-triangle
function sign(p1, p2, p3) {
   return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
}

function pointInTriangle(pt, [v1, v2, v3]) {
   let d1, d2, d3;
   let has_neg, has_pos;

   d1 = sign(pt, v1, v2);
   d2 = sign(pt, v2, v3);
   d3 = sign(pt, v3, v1);

   has_neg = d1 < 0 || d2 < 0 || d3 < 0;
   has_pos = d1 > 0 || d2 > 0 || d3 > 0;

   return !(has_neg && has_pos);
}

class Vector {
   constructor(x, y) {
      this.x = x;
      this.y = y;
   }

   static fromPolar(dir, mag) {
      return new Vector(Math.cos(dir) * mag, Math.sin(dir) * mag);
   }

   static cross(a, b) {
      return a.x * b.y - a.y * b.x;
   }

   add(v) {
      return new Vector(this.x + v.x, this.y + v.y);
   }

   subtract(v) {
      return new Vector(this.x - v.x, this.y - v.y);
   }

   scale(s) {
      return new Vector(this.x * s, this.y * s);
   }

   static scale(v, s) {
      return new Vector(v.x * s, v.y * s);
   }

   static dot(a, b) {
      return a.x * b.x + a.y * b.y;
   }

   static normalize(v) {
      const mag = Vector.magnitude(v);
      return new Vector(v.x / mag, v.y / mag);
   }

   static magnitude(v) {
      return Math.hypot(v.x, v.y);
   }

   static subtract(a, b) {
      return new Vector(a.x - b.x, a.y - b.y);
   }

   static add(a, b) {
      return new Vector(a.x + b.x, a.y + b.y);
   }
}
