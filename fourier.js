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
