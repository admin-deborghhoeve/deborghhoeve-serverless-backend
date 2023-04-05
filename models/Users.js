const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			requuired: true,
		},
		username: {
			type: String,
			requuired: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
