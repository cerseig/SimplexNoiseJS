var canvas = document.querySelector('#myCanvas'),
    ctx = canvas.getContext('2d'),
    canvasWidth = canvas.width,
    canvasHeight = canvas.height,
    angle = 0,
    points = [],
    lastCoord = [],
    simplex = new SimplexNoise(),
    value2d = 0,
    time = 0,
    x = 0,
    y = 0;

const color = [
  '#6F4360',
  '#473F46',
  '#8B6C7C',
  '#BA98A4',
  '#677565'
]

function getRandom(min, max) {
  return Math.floor(Math.random() * max + min);
}

function getRandomColor() {
  const index = getRandom(0, color.length);
  return color[index];
}

class Point {
  constructor (angle) {
    this.angle = angle;
    this.radius = 200;
    this.x = Math.cos(this.angle) * (this.radius + value2d);
    this.y = Math.sin(this.angle) * (this.radius + value2d);
  }
  draw() {
    ctx.beginPath();
    ctx.save();

    ctx.fillStyle = '#000';
    ctx.strokeStyle = '#000';


    ctx.translate(canvasWidth/2, canvasHeight/2);
    ctx.arc(this.x, this.y, 2, 0, Math.PI*2);
    ctx.moveTo(lastCoord.x, lastCoord.y);
    ctx.lineTo(this.x, this.y);

    ctx.stroke();
    ctx.fill();

    ctx.restore();
    ctx.closePath();

    lastCoord = {
      x: this.x,
      y: this.y
    }
  }
  frame() {
    time += 0.000025;
    value2d = simplex.noise2D(Math.cos(this.angle) + time, Math.sin(this.angle) + time) * 50;
    this.x = Math.cos(this.angle) * (this.radius + value2d);
    this.y = Math.sin(this.angle) * (this.radius + value2d);
  }
}

update()

function update() {

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  requestAnimationFrame( update );

  for (var i = 0; i < points.length; i++) {
    points[i].frame();
    points[i].draw();
  }
}

for (var i = 0; i <Math.PI*2; i+=0.05) {
  angle += 0.05; // augmenter du même angle pour un cercle parfait
  var point = new Point(angle, value2d); // on créé un nouvel objet Point
  points.push(point); // on pousse dans le tableau Points, chaque point créé
}
