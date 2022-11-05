// todo
const User = require("../models/userModel");
const { yl, rl, f_str } = require("../middleware/logger");

// todo
exports.usersList = async (req, res, next) => {
	try {
		const usersProjection = {
			__v: false,
			password: false,
		};
		let userList = await User.find({}, usersProjection);
		if (userList) {
			res.json(userList);
		} else {
			res.json("տեղի ունեցավ վատ բան սերվերում");
		}
	} catch (err) {
		rl.log(err.message);
		res.status(500).json("server internal error");
	}
};

// todo
exports.usersDel = async (req, res, next) => {
	// ?
	try {
		var user = await User.findOneAndDelete({
			_id: req.body.id,
		});

		if (user) {
			res.json("Հաճախորդը հաջողությամբ հեռացվեց բազայից։");
		} else {
			res.json("Նման մարդ բազայում չկա։");
		}
	} catch (err) {
		rl.log(err.message);
	}
};

// todo
exports.usersStatus = async (req, res, next) => {
	// ?
	try {
		var user = await User.findOne({
			_id: req.body.id,
		});

		if (user) {
			user.isAdmin = !user.isAdmin;
			await user.save();
			res.json("Հաճախորդի ստատուսը հաջողությամբ փոխվեց։");
		} else {
			res.json("Նման մարդ բազայում չկա։");
		}
	} catch (err) {
		rl.log(err.message);
	}
};
