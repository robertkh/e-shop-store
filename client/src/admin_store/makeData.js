// todo
const firstNames = ["jane", "john", "alex"];
const lastNames = ["smith", "jones"];

// todo
const products = Array(30)
	.fill()
	.map((a) => ({
		firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
		lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
		age: Math.ceil(75 * Math.random()),
	}));

// todo
export default products;
