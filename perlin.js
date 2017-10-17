var canvas = document.querySelector('#myCanvas'),
    ctx = canvas.getContext('2d'),
    canvasWidth = canvas.width,
    canvasHeight = canvas.height,
    angle = 0,
    points = [],
    lastCoord = [],
    simplex = new SimplexNoise(),
    value2d = 0,
    fps = 10,
    now,
    then = Date.now(),
    interval = 1000/fps,
    delta;
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

    ctx.fillStyle = getRandomColor();
    ctx.strokeStyle = getRandomColor();


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
    this.frame()
  }
  frame() {
    value2d = simplex.noise2D(this.x, this.y) * 20;

  }
}

update()

function update() {

  requestAnimationFrame( update );

  now = Date.now();
  delta = now - then;

    if (delta > interval) {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      for (var i = 0; i <Math.PI*2; i+=0.05) {
        angle += 0.05; // augmenter du même angle pour un cercle parfait
        var point = new Point(angle, value2d); // on créé un nouvel objet Point
        point.draw(); // on dessine le nouvel objet Point grâce à la méthode draw()
        points.push(point); // on pousse dans le tableau Points, chaque point créé
      }
        then = now - (delta % interval);
    }

}
