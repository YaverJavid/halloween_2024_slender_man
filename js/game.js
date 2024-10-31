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
      this.camera = new Camera(center, this.player);

      const areaSize = 1000;
      const bounds = {
         top: center.y - areaSize / 2,
         right: center.x + areaSize / 2,
         bottom: center.y + areaSize / 2,
         left: center.x - areaSize / 2,
      };
      const treeMaxCount = 10000;

      const minDistance = 200;
      const locations = this.#generateItems(treeMaxCount, bounds, minDistance);
      const slenderManLocation = locations.pop();
      this.trees = locations.map((center) => new Tree(center));
      this.slenderMan = new SlenderMan(slenderManLocation);
   }

   start() {
      this.#animate();
   }

   #update() {
      this.player.update();
      return this.camera.update();
   }

   #draw() {
      this.topCtx.clearRect(0, 0, this.topCanvas.width, this.topCanvas.height);
      this.cameraCtx.clearRect(
         0,
         0,
         this.cameraCanvas.width,
         this.cameraCanvas.height
      );

      this.trees.forEach((tree) => tree.draw(this.topCtx));
      this.slenderMan.draw(this.topCtx);

      this.player.draw(this.topCtx);
      this.camera.draw(this.topCtx);
   }

   #render(fov) {
      const centers = this.trees.map((t) => t.center);
      const inView = centers.filter((c) => pointInTriangle(c, fov));
      const slenderManInView = pointInTriangle(this.slenderMan.center, fov);
      const slenderMan = slenderManInView ? this.slenderMan : null;
      this.camera.render(this.cameraCtx, inView, slenderMan);
      if (slenderManInView) {
         if (distance(this.player.center, this.slenderMan.center) < 200) {
            return true;
         }
      }
      return false;
   }

   #animate() {
      const fov = this.#update();
      this.#draw();
      const gameOver = this.#render(fov);
      if (gameOver) {
         this.cameraCanvas.style.filter="sepia(1) saturate(5) hue-rotate(307deg)";
         return;
      }
      requestAnimationFrame(() => this.#animate());
   }

   #generateItems(tries, bounds, minDistance) {
      const locations = [];
      for (let i = 0; i < tries; i++) {
         const center = {
            x: lerp(bounds.left, bounds.right, Math.random()),
            y: lerp(bounds.top, bounds.bottom, Math.random()),
         };
         const nearbyItem = locations.find(
            (loc) => distance(center, loc) < minDistance
         );
         if (!nearbyItem) {
            locations.push(center);
         }
      }
      return locations;
   }
}
