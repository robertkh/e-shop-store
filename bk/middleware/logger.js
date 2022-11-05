// todo
var colors = require("colors");

// todo
exports.rl = require("tracer").colorConsole({
	format: [
		"{{timestamp}}   ( {{file}}:{{line}} )  {{message}}",
		{
			error: "{{timestamp}}  {{message}} (in {{file}}:{{line}})\nCall Stack:\n{{stack}}", // error format
		},
	],
	dateformat: "HH:MM",
	filters: [colors.red /*  colors.bold */],
});

// todo
exports.bl = require("tracer").colorConsole({
	format: [
		"{{timestamp}}   ( {{file}}:{{line}} )  {{message}}",
		{
			error: "{{timestamp}}  {{message}} (in {{file}}:{{line}})\nCall Stack:\n{{stack}}", // error format
		},
	],
	dateformat: "HH:MM",
	filters: [colors.blue /*  colors.bold */],
});

// todo
exports.yl = require("tracer").colorConsole({
	format: [
		"{{timestamp}}   ( {{file}}:{{line}} )  {{message}}",
		{
			error: "{{timestamp}}  {{message}} (in {{file}}:{{line}})\nCall Stack:\n{{stack}}", // error format
		},
	],
	dateformat: "HH:MM",
	filters: [colors.yellow /*  colors.bold */],
});

// todo
exports.gl = require("tracer").colorConsole({
	format: [
		"{{timestamp}}   ( {{file}}:{{line}} )  {{message}}",
		{
			error: "{{timestamp}}  {{message}} (in {{file}}:{{line}})\nCall Stack:\n{{stack}}", // error format
		},
	],
	dateformat: "HH:MM",
	filters: [colors.green /*  colors.bold */],
});

// todo
exports.ml = require("tracer").colorConsole({
	format: [
		"{{timestamp}}   ( {{file}}:{{line}} )  {{message}}",
		{
			error: "{{timestamp}}  {{message}} (in {{file}}:{{line}})\nCall Stack:\n{{stack}}", // error format
		},
	],
	dateformat: "HH:MM",
	filters: [colors.magenta /*  colors.bold */],
});

// todo
exports.f_str = (msg) => {
	return "\n-------\n" + msg + "\n-------\n";
};
