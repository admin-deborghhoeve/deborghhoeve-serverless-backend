const mongoose = require("mongoose");

const BlockedDatesSchema = new mongoose.Schema(
	{
		listName: {
			type: String,
			default: "list_De-Borgh-Hoeve",
			required: true,
		},
		dateList: {
			type: [Date],
			required: true,
		},
	},
	{ timestamps: true }
);
// export a mongoose model giving its name and the schema used to create it.
const BlockedDatesModel = mongoose.model("blockeddates", BlockedDatesSchema);

module.exports = BlockedDatesModel;
