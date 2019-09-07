const WHITE = 255;
const BLACK = 0;
const WIDTH = window.innerWidth;//1920;
const HEIGHT = window.innerHeight;//937;
let time = x = y = 0;
let omega = 0.1;
let wave = [];

function setup() {
	createCanvas(WIDTH, HEIGHT);
}

function draw() {
	background(BLACK);
	translate(WIDTH/2-200, HEIGHT/2);
	stroke(WHITE);
	noFill();
	x = y = 0;
	let n = 2;
	beginShape();
	vertex(0, 0);
	for (let k = 0; k < n; k++) {
		r = 150/(2*k+1);
		ellipse(x, -y, 2*r);
		x += r * cos((2*k+1)*time*omega);
		y += r * sin((2*k+1)*time*omega);
		vertex(x, -y);
	}
	vertex(195, -y);
	wave.push(-y);
	for(i = wave.length - 1; i >= 0; i--) {
		vertex(195+wave.length-i,wave[i]);
	}
	endShape();
	if (wave.length > 305)
		wave.shift();
	time += 0.1;
}
