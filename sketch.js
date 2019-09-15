const WHITE = 255;
const BLACK = 0;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const DELTAX = 0;
let time = x = y = 0;
let wave = [];
let shape = [];
let circles = [];
let skip;
let takingInput = 2;

function setup() {
	createCanvas(WIDTH, HEIGHT);
}

function mousePressed() {
	takingInput = 1;
	shape = [];
	wave = [];
	circles = [];
	time = 0;
}

function mouseReleased() {
	takingInput = time = 0;
	let n = shape.length;
	let x = pow(2,int(log(n)/log(2))+1) - n;
	for (let i = 0; i < x; i++)
		shape.push(shape[n-1]);
	n = shape.length;
	//circle1 = dft(shape);
	circles = fft(shape);
	for (let i = 0; i < n; i++) {
		let x1 = circles[i].x;
		let y1 = circles[i].y;
		circles[i] = {r:sqrt(x1*x1+y1*y1)/n, w:i, p:atan2(y1,x1)};
	}
	circles.sort((a, b) => b.r - a.r);
	//circle1.sort((a, b) => b.r - a.r);
	skip = circles.length;
	//console.log(circle1);
	console.log(circles);
}

//function myInputEvent() {
//	let s = int(abs(this.value()));
//	if (s > shape.length)
//		skip = shape.length;
//	else if (s < 0)
//		skip = 0;
//	else
//		skip = s;
//	inp.value(skip);
//}

function drawCircles(circles) {
	let px, py;
	px = py = 0;
	vertex(0, 0);
	for (let i = 0; i < skip; i+=1) {
		ellipse(px, py, 2*circles[i].r);
		px += circles[i].r*cos(circles[i].w*time+circles[i].p);
		// -= to invert y axis
		py += circles[i].r*sin(circles[i].w*time+circles[i].p);
		vertex(px, py);
	}
	return {px, py};
}

function draw() {
	background(BLACK);
	//To move everything to centre
	translate(WIDTH/2-DELTAX, HEIGHT/2);
	noFill();
	stroke(WHITE);
	beginShape();
	if(takingInput == 1) {
		shape.push({x:mouseX-WIDTH/2, y:mouseY-HEIGHT/2});
		for (let k = 0; k < shape.length; k++) {
			vertex(shape[k].x, shape[k].y);
		}
	}
	else if(takingInput == 0) {
		let p = drawCircles(circles);
		for (let k = wave.length - 1; k >= 0; k--) {
			vertex(wave[k].px, wave[k].py);
		}
		wave.push(p);
	}
	endShape();
	if (wave.length == shape.length)
		wave = [];
	time += 2*PI/shape.length;
}
