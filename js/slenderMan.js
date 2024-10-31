class SlenderMan {
   static height = 30;
   constructor(center) {
      this.center = center;
      this.size = 50;
   }

   static render(ctx, center, distanceToCamera) {
      const scaledHeight = (0.01 * Tree.height) / distanceToCamera;

      ctx.save();
      ctx.translate(center.x, center.y);
      ctx.scale(scaledHeight, scaledHeight);

      const hue = 120;
      const lightness1 = (1 - distanceToCamera / Camera.maxViewDistance) * 30;
      const lightness2 = (1-Math.abs(center.x-ctx.canvas.width/2)/ctx.canvas.width*2)*30;
      const lightness =  Math.min(lightness1, lightness2);


      //body color
      ctx.strokeStyle = `hsl(${hue}, 0%, ${lightness}%)`;

      // legs
      ctx.lineWidth = 1.5;
      let spread = 2;
      const legLength = SlenderMan.height *0.4
      ctx.beginPath();
      ctx.moveTo(-spread / 2, 0);
      ctx.lineTo(-spread / 2, -legLength);
      ctx.moveTo(spread / 2, 0);
      ctx.lineTo(spread / 2, -legLength);
      ctx.stroke();

      // arms
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      spread=6.5;
      const armLength=SlenderMan.height*0.5
      ctx.beginPath();
      ctx.moveTo(-spread / 2, -legLength);
      ctx.lineTo(-spread / 2, -legLength-armLength);
      ctx.lineTo(spread / 2, -legLength-armLength);
      ctx.lineTo(spread / 2, -legLength);
      ctx.stroke();

      //body
      spread=2;
      ctx.beginPath();
      ctx.rect(-spread/2,
         -legLength-armLength,
         spread,
         SlenderMan.height*0.6);
      ctx.stroke();
      ctx.fillStyle = `hsl(${hue}, 0%, ${lightness}%)`;
      ctx.fill();

      // head
      ctx.beginPath();
      ctx.moveTo(0, -SlenderMan.height+3);
      ctx.ellipse(0, -SlenderMan.height, 2, 3, 0,
          Math.PI*0.75, Math.PI*2.25);
      const headLightness=lightness*3;
      ctx.fillStyle = `hsl(${hue}, 0%, ${headLightness}%)`;
      ctx.fill();

      ctx.restore();
   }

   draw(ctx) {
      const { center, size } = this;
      ctx.save();
      ctx.translate(center.x, center.y);
      ctx.fillStyle = "red";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = size + "px Arial";
      ctx.fillText("S", 0, 0);
      ctx.restore();
   }
}
