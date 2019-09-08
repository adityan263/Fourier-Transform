const WHITE = 255;
const BLACK = 0;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const DELTAX = 200;
let time = x = y = 0;
let wave = [];
let shapes = [];
let skip;

function setup() {
	let txt = createDiv('Number of circles');
	inp = createInput("", "text");
	inp.input(myInputEvent);
	inp.position(150,0);
	inp.size(40,8);
	b1 = createButton("+");
	b2 = createButton("-");
	b1.mousePressed(function() {
		if (skip < shapes[0].length) {
			skip += 1;
			inp.value(skip);
		}
	});
	b2.mousePressed(function() {
		skip = skip-1 ? skip-1 : 1;
		inp.value(skip);
	});
	radio = createRadio();
	createCanvas(WIDTH, HEIGHT);
	radio.option("Rectangular",1);
	radio.option("Triangular", 2);
	radio.option("Saw Tooth", 3);
	radio.option("Reverse Saw Tooth", 4);
	shapes.push(dft(generateWave(1)));
	shapes.push(dft(generateWave(2)));
	shapes.push(dft(generateWave(3)));
	shapes.push(dft(generateWave(4)));

	//to make it look better
	for (let i = 0; i < 4; i++)
		shapes[i].sort((a, b) => b.r - a.r);
	inp.value(shapes[0].length);
	skip = shapes[0].length;
}

function myInputEvent() {
	let s = int(abs(this.value()));
	if (s > shapes[0].length)
		skip = shapes[0].length;
	else if (s < 0)
		skip = 0;
	else
		skip = s;
	inp.value(skip);
}

function generateWave(x) {
	let wave = [];
	for (let i = 0; i < 200; i++) {
		switch(x) {
			case 1:
				wave.push({x:0, y:(int(i/100)%2)*100});
				break;
			case 2:
				wave.push({x:0, y:int(i/100)%2?200-i:i});
				break;
			case 3:
				wave.push({x:0, y:int(100-i%100)});
				break;
			case 4:
				wave.push({x:0, y:int(i%100)});
				break;
		}
		wave[i].y = wave[i].y*2-100;
	}
	return wave;
}

function dft(f) {
	let F = [];
	//F[x] = from k=0 to n-1 summation( f[k] * e^(2*PI*i*k*x/n) )/n
	
	const n = f.length;
	for (let x = 0; x < n; x++) {
		var x1, y1;
		x1 = y1 = 0;
		for (let k = 0; k < n; k++) {
			x1 += f[k].x * cos(2*PI*k*x/n) + f[k].y * sin(2*PI*k*x/n);
			y1 += f[k].x * -sin(2*PI*k*x/n) + f[k].y * cos(2*PI*k*x/n);
		}
		F[x] = {r:sqrt(x1*x1+y1*y1)/n, w:x, p:atan2(y1,x1)};
	}
	return F;
}

function drawCircles() {
	let px, py;
	let circles = shapes[radio.value()?radio.value()-1:0];
	px = py = 0;
	vertex(0, 0);
	for (let i = 0; i < skip; i+=1) {
		ellipse(px, py, 2*circles[i].r);
		px += circles[i].r*cos(circles[i].w*time+circles[i].p);
		// -= to invert y axis
		py -= circles[i].r*sin(circles[i].w*time+circles[i].p);
		vertex(px, py);
	}
	return {px, py};
}

function draw() {
	background(BLACK);
	//To move everything to centre
	translate(WIDTH/2-DELTAX, HEIGHT/2);
	stroke(WHITE);
	noFill();
	beginShape();
	let p = drawCircles();
	for (let k = wave.length - 1; k >= 0; k--) {
		vertex(wave.length-k, wave[k].py);
	}
	wave.push(p);
	endShape();
	if (wave.length > WIDTH/2+DELTAX)
		wave.shift();
	time += 2*PI/shapes[0].length;
}
