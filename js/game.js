class Game {
   constructor(topCanvas, cameraCanvas) {
      this.topCanvas = topCanvas;
      this.topCtx = topCanvas.getContext("2d");

      this.cameraCanvas = cameraCanvas;
      this.cameraCtx = cameraCanvas.getContext("2d");

      const center = {
         x: topCanvas.width / 2,
         y: topCanvas.height / 2,
      };

      this.player = new Player(center);
      this.camera= new Camera(center, this.player);

      const areaSize = 10000;
      const bounds = {
         top: center.y - areaSize / 2,
         right: center.x + areaSize / 2,
         bottom: center.y + areaSize / 2,
         left: center.x - areaSize / 2,
      };
      const treeMaxCount = 10000;

      const minDistance = 200;
      this.trees = this.#generateTrees(treeMaxCount, bounds, minDistance);
   }

   start() {
      this.#animate();
   }

   #update(){
      this.player.update();
      return this.camera.update();
   }

   #draw(){
      this.topCtx.clearRect(0, 0, this.topCanvas.width, this.topCanvas.height);
      this.cameraCtx.clearRect(0, 0, this.cameraCanvas.width, this.cameraCanvas.height);

      this.player.draw(this.topCtx);
      this.camera.draw(this.topCtx);
      this.trees.forEach((tree) => tree.draw(this.topCtx));
   }

   #render(fov) {
      const centers = this.trees.map((t) => t.center);
      const inView = centers.filter((c) => pointInTriangle(c, fov));
      this.camera.render(this.cameraCtx, inView);
   }

   #animate() {
      const fov = this.#update();
      this.#draw();
      this.#render(fov);
      requestAnimationFrame(() => this.#animate());
   }

   #generateTrees(tries, bounds, minDistance) {
      const trees = [];
      for (let i = 0; i < tries; i++) {
         const center = {
            x: lerp(bounds.left, bounds.right, Math.random()),
            y: lerp(bounds.top, bounds.bottom, Math.random()),
         };
         const centers = trees.map((tree) => tree.center);
         centers.push(this.player.center);
         const nearbyItem = centers.find((loc) => distance(center, loc) < minDistance);
         if (!nearbyItem) {
            trees.push(new Tree(center));
         }
      }
      return trees;
   }
}
