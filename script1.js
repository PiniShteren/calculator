var p = [];
let dot = false;
function NumBer(val) {
	debugger;
	if (document.getElementById('screen').innerHTML.length >= 7) {
		document.getElementById('screen').style.fontSize = '20px';
	}
	if (
		val !== '%' &&
		val !== '-' &&
		val !== '*' &&
		val !== '+' &&
		val !== '%' &&
		val !== '/' &&
		val !== '.' &&
		Number.isInteger(val) === false
	) {
		return;
	}
	let v = 0;
	if (p.length === 0) {
		if (val >= 0 && val <= 9) {
			p.push(val);
			document.getElementById('screen').innerHTML = val;
		}
	}
	else {
		if (val >= 0 && val <= 9) {
			if ((p[p.length - 1] >= 0 && p[p.length - 1] <= 9) || p[p.length - 1] === '.') {
				p.push(val);
				v = document.getElementById('screen').innerHTML.toString() + val;
				v = v.replace(/,/g, '');
				if (v.indexOf('.') > 0) {
					let index = v.indexOf('.');
					let num1 = v.slice(0, index);
					num1 = Math.floor(num1).toLocaleString();
					let num2 = v.slice(index);
					v = num1 + num2;
					console.log(v);
				}
				else {
					v = Math.floor(v).toLocaleString();
				}
				document.getElementById('screen').innerHTML = v;
				return;
			}
			else {
				p.push(val);
				document.getElementById('screen').innerHTML = val.toLocaleString();
				dot = false;
			}
		}
		else {
			if (val === '%') {
				document.getElementById('screen').innerHTML += val;
				let p1 = p[0].toString();
				let p2 = '';
				let fanc = 0;
				for (let j = 1; j < p.length; j++) {
					if (p[j] === '+' || p[j] === '-' || p[j] === '*' || p[j] === '/') {
						fanc = j;
						continue;
					}
					else {
						if (fanc > 0 && j > fanc) {
							p2 += p[j].toString();
							p[j] = ' ';
						}
						else {
							p1 += p[j].toString();
						}
					}
				}
				p1 = p1 / 100;
				p1 = p1 * p2;
				p[fanc + 1] = p1;
			}
			else {
				let x = p[0].toString();
				for (let i = 1; i < p.length; i++) {
					x += p[i].toString();
				}
				if (
					(x.indexOf('+') >= 0 && x.indexOf('+') <= x.length - 2) ||
					(x.indexOf('-') >= 0 && x.indexOf('-') <= x.length - 2) ||
					(x.indexOf('*') >= 0 && x.indexOf('*') <= x.length - 2) ||
					(x.indexOf('/') >= 0 && x.indexOf('/') <= x.length - 2)
				) {
					let y = eval(x);
					document.getElementById('screen').innerHTML = y.toLocaleString();
					p = [
						y,
						val
					];
					dot = false;
				}
				else {
					p.push(val);
				}
			}
		}
	}
}
function addDot() {
	if (!dot) {
		p.push('.');
		document.getElementById('screen').innerHTML += '.';
		dot = true;
	}
}

function clean() {
	document.getElementById('screen').style.fontSize = '40px';
	document.getElementById('screen').innerHTML = ' ';
	p = [];
	dot = false;
}
function equal() {
	debugger;
	let x = p[0].toString();
	for (let i = 1; i < p.length; i++) {
		x += p[i].toString();
	}
	if (
		(x.toString().indexOf('+') >= 0 && x.toString().indexOf('+') <= x.toString().length - 2) ||
		(x.toString().indexOf('-') >= 0 && x.toString().indexOf('-') <= x.toString().length - 2) ||
		(x.toString().indexOf('*') >= 0 && x.toString().indexOf('*') <= x.toString().length - 2) ||
		(x.toString().indexOf('/') >= 0 && x.toString().indexOf('/') <= x.toString().length - 2)
	) {
		let y = eval(x);
		if (y.length < 7) {
			document.getElementById('screen').style.fontSize = '40px';
		}

		document.getElementById('screen').innerHTML = y.toLocaleString();
		p = [
			y
		];
	}
}
function setKey() {
	window.addEventListener('keydown', function(event) {
		NumBer(event.key);
	});
}
let c = '1111';
