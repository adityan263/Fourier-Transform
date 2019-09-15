function dft(f) {
	let F = [];
	const n = f.length;
	//F[x] = from k=0 to n-1 summation( f[k] * e^(2*PI*i*k*x/n) )/n
	for (let x = 0; x < n; x++) {
		let t = new ComplexNumber(0, 0);
		for (let k = 0; k < n; k++) {
			let c = CreateComplexFromTheta(-2 * PI * k * x / n);
			c = c.mult(f[k]);
			t = t.add(c);
		}
		F[x] = t.getCircle(n, x);
	}
	return F;
}

function fft(f) {
	let n = f.length;
	let x = pow(2, int(log(n) / log(2)) + 1) - n;
	// padding
	for (let i = 0; i < x; i++)
		f.push(f[n - 1]);
	n += x;
	F = actual_fft(f);
	F = F.map((x, i) => x.getCircle(n, i));
	return F;
}

function actual_fft(f) {
	const n = f.length;
	if (n == 1)
		return f;
	let F = [];
	let odd = f.filter((x, i) => (i % 2) && (F.push({})));
	let even = f.filter((x, i) => (i + 1) % 2);
	let Fodd = actual_fft(odd);
	let Feven = actual_fft(even);
	for (let i = 0; i < n / 2; i++) {
		let c = CreateComplexFromTheta(-2 * PI * i / n);
		c = c.mult(Fodd[i]);
		F[i] = Feven[i].add(c);
		F[i + n / 2] = Feven[i].sub(c);
	}
	return F;
}
