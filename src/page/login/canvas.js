/**
 * 描述：canvas 混合类
 */
class Circle {
	constructor (x, y) {
		this.x = x;
		this.y = y;
		this.r = Math.random() * 5 + 1;
		this._mx = Math.random() * 2 - 1;
		this._my = Math.random() * 2 - 1;
	};
	drawCircle (ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, 360);
		ctx.closePath();
		ctx.fillStyle = 'rgba(184, 184, 184, 0.2)';
		ctx.fill();
	};
	drawLine (ctx, _circle) {
		let dx = this.x - _circle.x;
		let dy = this.y - _circle.y;
		let d = Math.sqrt(dx * dx + dy * dy);
		if (d < 150) {
			ctx.beginPath();
			ctx.moveTo(this.x, this.y); // 起始点
			ctx.lineTo(_circle.x, _circle.y); // 终点
			ctx.closePath();
			ctx.strokeStyle = 'rgba(164, 164, 164, 0.1)';
			ctx.stroke();
		}
	};
	move (w, h) {
		this._mx = (this.x < w && this.x > 0) ? this._mx : (-this._mx);
		this._my = (this.y < h && this.y > 0) ? this._my : (-this._my);
		this.x += this._mx / 2;
		this.y += this._my / 2;
	}
}

class CurrentCircle extends Circle {
    /* eslint no-useless-constructor: 0 */
    constructor (x, y) {
        super(x, y);
    };
    drawCircle (ctx) {
        ctx.beginPath();
        this.r = 1;
		ctx.arc(this.x, this.y, this.r, 0, 360);
		ctx.closePath();
		ctx.fillStyle = 'rgba(45, 120, 244, ' + (parseInt(Math.random() * 100) / 100) + ')';
		ctx.fill();
    }
}

export default {
    data () {
        return {
            timer: null
        };
    },
    methods: {
        init () {
            let canvas = this.$refs.canvas;
            let ctx = canvas.getContext('2d');
            let w = canvas.width = canvas.offsetWidth;
            let h = canvas.height = canvas.offsetHeight;
            let circles = [];
            let currentcircle = new CurrentCircle(0, 0);

            let draw = () => {
                ctx.clearRect(0, 0, w, h);
                for (let i = 0; i < circles.length; i++) {
                    circles[i].move(w, h);
                    circles[i].drawCircle(ctx);
                    for (let j = i + 1; j < circles.length; j++) {
                        circles[i].drawLine(ctx, circles[j]);
                    }
                }
                if (currentcircle.x) {
                    currentcircle.drawCircle(ctx);
                    for (let k = 1; k < circles.length; k++) {
                        currentcircle.drawLine(ctx, circles[k]);
                    }
                }
                this.timer = window.requestAnimationFrame(draw);
            };
            let step = function (num) {
                for (let i = 0; i < num; i++) {
                    circles.push(new Circle(Math.random() * w, Math.random() * h));
                }
                draw();
            };
            step(30);
        },
        beforeDestroy () {
            if (this.timer) {
                window.cancelAnimationFrame(this.timer);
                this.timer = null;
            }
        }
    }
};
