function dft(f) {
	let F = [];
	//F[x] = from k=0 to n-1 summation( f[k] * e^(2*PI*i*k*x/n) )/n
	
	const n = f.length;
	for (let x = 0; x < n; x++) {
		var x1, y1;
		x1 = y1 = 0;
		for (let k = 0; k < n; k++) {
			x1 += f[k].x * cos(2*PI*k*x/n) - f[k].y * sin(-2*PI*k*x/n);
			y1 += f[k].x * sin(-2*PI*k*x/n) + f[k].y * cos(2*PI*k*x/n);
		}
		F[x] = {r:sqrt(x1*x1+y1*y1)/n, w:x, p:atan2(y1,x1)};
	}
	return F;
}

function fft(f) {
	let n = f.length;
	let x = pow(2,int(log(n)/log(2))+1) - n;
	// padding
	for (let i = 0; i < x; i++)
		f.push(f[n-1]);
	n += x;
	F = actual_fft(f);
	for (let i = 0; i < n; i++) {
		let x1 = F[i].x;
		let y1 = F[i].y;
		F[i] = {r:sqrt(x1*x1+y1*y1)/n, w:i, p:atan2(y1,x1)};
	}
	return F;
}

function actual_fft(f) {
	const n = f.length;
	if (n == 1)
		return f;
	let odd = [];
	let even = [];
	let F = [];
	for (let i = 0; i < n/2; i++) {
		even.push(f[2*i]);
		odd.push(f[2*i+1]);
		F.push({});
		F.push({});
	}
	let Fodd = actual_fft(odd);
	let Feven = actual_fft(even);
	for (let i = 0; i < n/2; i++) {
		let re = cos(2*-PI*i/n) * Fodd[i].x - sin(2*-PI*i/n) * Fodd[i].y;
		let im = sin(2*-PI*i/n) * Fodd[i].x + cos(2*-PI*i/n) * Fodd[i].y;
		F[i].x = Feven[i].x + re;
		F[i].y = Feven[i].y + im;
		F[i+n/2].x = Feven[i].x - re;
		F[i+n/2].y = Feven[i].y - im;
	}
	return F;
}
