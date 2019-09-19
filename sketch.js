const WHITE = 255;
const BLACK = 0;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const DELTAX = 0;
let time = 0;
let wave = [];
let shape = [];
let circles = [];
let skip;
let indexFT = 0;
let FT;
let takingInput = 2;

function setup() {
	FT = [["FFT",dft],["DFT",fft]];
	button = createButton(FT[indexFT][0]);
	button.mousePressed(() => {indexFT ^= 1});
	button.id("buttonFT");
	createCanvas(WIDTH, HEIGHT);
}

function mousePressed() {
	if (mouseY < HEIGHT && mouseX < WIDTH && mouseY > 0) {
		takingInput = 1;
		shape = [];
	}
	wave = [];
	circles = [];
}

function mouseReleased() {
	document.getElementById("buttonFT").innerHTML = FT[indexFT][0];
	circles = FT[indexFT][1](shape);
	n = circles.length;
	circles.sort((a, b) => b.r - a.r);
	skip = circles.length;
	time = 0;
	if (takingInput) {
		takingInput = 0;
	}
	else {
		wave = [];
	}
}

function drawCircles(circles) {
	let px, py;
	px = py = 0;
	vertex(0, 0);
	for (let i = 0; i < skip && i < circles.length; i += 1) {
		ellipse(px, py, 2 * circles[i].r);
		px += circles[i].r * cos(circles[i].w * time + circles[i].p);
		py += circles[i].r * sin(circles[i].w * time + circles[i].p);
		vertex(px, py);
	}
	return new ComplexNumber(px, py);
}

function draw() {
	background(BLACK);
	//To move everything to centre
	translate((WIDTH / 2) - DELTAX, HEIGHT / 2);
	noFill();
	stroke(WHITE);
	beginShape();
	if(takingInput == 1) {
		if (mouseY < HEIGHT && mouseX < WIDTH && mouseY > 0) {
			shape.push(new ComplexNumber(mouseX - (WIDTH / 2), mouseY - (HEIGHT / 2)));
			for (let k = 0; k < shape.length; k++) {
				vertex(shape[k].re, shape[k].im);
			}
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
	if (wave.length == circles.length) {
		wave = [];
	}
	time += (2 * PI / circles.length);
}
