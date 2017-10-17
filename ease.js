var canvas = document.querySelector('#myCanvas');
var ctx = canvas.getContext('2d');
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var now = Date.now();
var lastTime = now;
var deltaTime = 16;
var position = [];
var duration = 500;
var currentTime = 0;
var angle = 0;

class cursor {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.position = vec2.fromValues(x, y);
    var vx = Math.random() * 5 - 1;
    var vy = Math.random() * 5 - 1;
    this.velocity = vec2.fromValues(vx, vy);
    this.rotate = 0;
  }

  draw() {
    ctx.beginPath();
    ctx.save();
    ctx.fillStyle = '#FFF';
    ctx.translate(this.position[0], this.position[1]);
    ctx.rotate(this.rotate);
    ctx.moveTo(50, 0);
    ctx.lineTo(0,150);
    ctx.lineTo(100,150);
    ctx.fill();
    ctx.restore();
    ctx.closePath();
  }
  // récupère les variables
  tween(targetPos, duration) {
    this.currentTime = 0;
    this.targetPos = targetPos;
    this.duration = duration;
    this.startDest = vec2.fromValues(this.position[0], this.position[1]);

    this.frame();

  }
  frame() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    this.rafID = requestAnimationFrame (this.frame.bind(this));

    now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    this.currentTime += deltaTime;

    if(this.currentTime < this.duration) {
      this.position[0] = Easing.easeInOutQuad(this.currentTime, this.startDest[0], this.targetPos.x - this.startDest[0], this.duration);
      this.position[1] = Easing.easeInOutQuad(this.currentTime, this.startDest[1], this.targetPos.y - this.startDest[1], this.duration);

      var dx = this.targetPos.x - this.startDest[0];
      var dy = this.targetPos.y - this.startDest[1];
      this.rotate = Math.atan2(dy, dx) ;

    } else {
      cancelAnimationFrame(this.rafID)
    }

    this.draw();

  }
}

canvas.addEventListener('mousemove', function (evt) {
  targetPos = {
    x: evt.clientX,
    y: evt.clientY
  }
  console.log("X " + evt.clientX + "\n" + "Y " + evt.clientY + "\n");

  triangle.tween(targetPos, 500);

});

var triangle = new cursor(0,0);
triangle.draw();
console.log(triangle);

// t = currentTime
// b = beginnig value
// c = change value (delta between `from` and `to`)
// d = duration
// easeOutBack( t, b, c, d, s );
