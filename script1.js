var p = [];
let dot = false;
function clickEvent(val) {
	switch (document.getElementById('screen').innerHTML.length) {
		case 7:
			document.getElementById('screen').style.fontSize = '28px';
			break;
		case 9:
			document.getElementById('screen').style.fontSize = '20px';
			break;
		case 26:
			alert('אי אפשר להכניס יותר תווים');
			break;
		case 27:
			document.getElementById('screen').innerHTML = '';
			p = [];
			break;
	}
	// switch (val) {
	// 	case Number(val), 0:
	// 		if (p.length === 0) {
	// 			if(val > 0){
	// 			p.push(val);
	// 			document.getElementById('screen').innerHTML = val;
	// 			break;	
	// 			}
	// 		} else {
	// 			if (Number(p[p.length - 1]) || p[p.length - 1] === 0 || p[p.length - 1] === ".") {
	// 				p.push(val);
	// 				let v = 0;
	// 				v = document.getElementById('screen').innerHTML.toString() + val;
	// 				v = v.replace(/,/g, '');
	// 				if (v.indexOf('.') > 0) {
	// 					let index = v.indexOf('.');
	// 					let num1 = v.slice(0, index);
	// 					num1 = Math.floor(num1).toLocaleString();
	// 					let num2 = v.slice(index);
	// 					v = num1 + num2;
	// 					console.log(v);
	// 				}
	// 				else {
	// 					v = Math.floor(v).toLocaleString();
	// 				}
	// 				document.getElementById('screen').innerHTML = v;
	// 				break
	// 			} else {
	// 				p.push(val);
	// 				document.getElementById('screen').innerHTML = val.toLocaleString();
	// 				dot = false;
	// 			}
	// 		}
	// }
	let num = val > 0 && val <= 9 ? Number(val) : val;
	if (
		num !== '%' &&
		num !== '-' &&
		num !== '*' &&
		num !== '+' &&
		num !== '%' &&
		num !== '/' &&
		num !== '.' &&
		num !== "0" &&
		Number.isInteger(num) === false
	) {
		return;
	}
	if (p.length === 0) {
		if (num > 0 && num <= 9) {
			p.push(num);
			document.getElementById('screen').innerHTML = num;
		}
	}
	else {
		if (num >= 0 && num <= 9) {
			if ((p[p.length - 1] >= 0 && p[p.length - 1] <= 9) || p[p.length - 1] === '.') {
				p.push(num);
				v = document.getElementById('screen').innerHTML.toString() + num;
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
				p.push(num);
				document.getElementById('screen').innerHTML = num.toLocaleString();
				dot = false;
			}
		}
		else {
			if (num === '%') {
				document.getElementById('screen').innerHTML += num;
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
						num
					];
					dot = false;
				}
				else {
					p.push(num);
				}
			}
		}
	}
}
function addDot() {
	debugger
	if (!dot && (p[p.length -1] >=0 || p[p.length -1] <=9)) {
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

let nums = document.querySelectorAll('#num')
for(let i = 0; i < nums.length; i++){
	nums[i].onclick = ({target}) => clickEvent(target.value)
}

document.getElementById('dot').onclick = () => addDot();
document.getElementById('clean').onclick = () => clean();
document.getElementById('equal').onclick = () => equal();