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
	circles = fft(shape);
	n = circles.length;
	console.log(circles);
	circles.sort((a, b) => b.r - a.r);
	skip = circles.length;
}

function drawCircles(circles) {
	let px, py;
	px = py = 0;
	vertex(0, 0);
	for (let i = 0; i < skip; i+=1) {
		ellipse(px, py, 2*circles[i].r);
		px += circles[i].r*cos(circles[i].w*time+circles[i].p);
		py += circles[i].r*sin(circles[i].w*time+circles[i].p);
		vertex(px, py);
	}
	return new ComplexNumber(px, py);
}

function draw() {
	background(BLACK);
	//To move everything to centre
	translate(WIDTH/2-DELTAX, HEIGHT/2);
	noFill();
	stroke(WHITE);
	beginShape();
	if(takingInput == 1) {
		shape.push(new ComplexNumber(mouseX - (WIDTH / 2), mouseY - (HEIGHT / 2)));
		for (let k = 0; k < shape.length; k++) {
			vertex(shape[k].re, shape[k].im);
		}
	}
	else if(takingInput == 0) {
		let p = drawCircles(circles);
		for (let k = wave.length - 1; k >= 0; k--) {
			vertex(wave[k].re, wave[k].im);
		}
		wave.push(p);
	}
	endShape();
	if (wave.length == circles.length)
		wave = [];
	time += 2*PI/circles.length;
}
