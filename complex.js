class ComplexNumber {
	constructor(x, y) {
		this.re = x;
		this.im = y;
	}

	add(c) {
		return new ComplexNumber(this.re + c.re, this.im + c.im);
	}

	sub(c) {
		return new ComplexNumber(this.re - c.re, this.im - c.im);
	}

	mult(c) {
		const re = this.re * c.re - this.im * c.im;
		const im = this.re * c.im + this.im * c.re;
		return new ComplexNumber(re, im);
	}

	getScaledRadius(n = 1) {
		return sqrt(this.re * this.re + this.im * this.im) / n;
	}

	getPhase() {
		if(this.re)
		return atan2(this.im, this.re);
	}
}

function CreateComplexFromTheta(theta) {
	return new ComplexNumber(cos(theta), sin(theta));
}
