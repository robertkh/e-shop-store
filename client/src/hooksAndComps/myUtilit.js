var _ = require("lodash");

// todo
export function numToCurr(n) {
	return new Intl.NumberFormat("hy-AM").format(n) + " \u058F";
}

// todo
export function currToNum(str) {
	return +str.replace(",", "").replace(" ֏", "");
}

// todo
export function writeName(str) {
	return _.capitalize(_.snakeCase(str.toLowerCase().trim()));
}

// todo
export function readName(str) {
	return str.replace(/_/g, " ");
}
