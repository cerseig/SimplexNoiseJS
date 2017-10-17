
        var canvas = document.querySelector('#myCanvas');
        var ctx = canvas.getContext('2d');
        var pointsArr = [];
        var quantity = 100;
        var baseRayon = 300;
        var ampli = 30;
        var simplex = new SimplexNoise();
        console.log(simplex);
        var time = 0;
        canvas.height = window.innerHeight
        canvas.width = window.innerWidth


        function Point (opts) {
            this.position = [];
            this.ctx = opts.ctx;
            this.rank = opts.rank;
            this.angle = opts.angle;
            this.radius = baseRayon;
            this.trigo = [];
            this.calcPosition();
        }
        Point.prototype = {
            update: function(time){
                this.radius = simplex.noise3D(this.trigo[0], this.trigo[1], time) * ampli + baseRayon;
                this.calcPosition();
            },
            render: function() {
                this.ctx.save()
                this.ctx.beginPath()
                this.ctx.translate(this.position[0], this.position[1])
                this.ctx.arc(0, 0, 1, 0, Math.PI * 2)
                this.ctx.strokeStyle = "white";
                this.ctx.stroke()
                this.ctx.closePath()
                this.ctx.restore()
            },
            calcPosition: function() {
                this.trigo = [
                    Math.cos(this.angle),
                    Math.sin(this.angle)
                ]
                this.position[0] = this.radius * this.trigo[0] + canvas.width/2;
                this.position[1] = this.radius * this.trigo[1] + canvas.height/2;
            }
        }
        var step = Math.PI*2/quantity;
        for ( var i = 0; i < quantity; i++) {
            var point = new Point({
                ctx: ctx,
                rank: i,
                angle: step*i
            })
            pointsArr.push(point)
        }
        function drawLines(){
            this.ctx.save()
            this.ctx.beginPath()
            this.ctx.moveTo(pointsArr[0].position[0], pointsArr[0].position[1])

            for(var i = 0; i<pointsArr.length; i++){
                this.ctx.lineTo(pointsArr[i].position[0], pointsArr[i].position[1])
            }
            this.ctx.closePath()
            this.ctx.strokeStyle = "white";
            this.ctx.stroke()
            this.ctx.restore()
        }
        function frame() {
            time += 0.005;
            ctx.clearRect(0,0, canvas.width, canvas.height)
            for(var i = 0; i<pointsArr.length; i++){
                pointsArr[i].update(time)
                pointsArr[i].render()
            }
            drawLines();
            requestAnimationFrame(frame)
        }
        frame();
