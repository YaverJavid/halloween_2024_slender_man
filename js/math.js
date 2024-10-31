function lerp(a, b, t) {
   return a + (b - a) * t;
}

function distance(a, b) {
   return Math.hypot(a.x - b.x, a.y - b.y);
}