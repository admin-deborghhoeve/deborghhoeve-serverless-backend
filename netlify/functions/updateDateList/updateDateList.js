const dotenv = require("dotenv");
dotenv.config();

// Cors
const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Headers":
		"Origin, X-Requested-With, Content-Type, Accept",
	"Access-Control-Allow-Methods": "GET, PUT",
};

const mongoose = require("mongoose");
const BlockedDatesModel = require("../../../models/BlockedDates.js");

console.log("MongoDB ready state: ", mongoose.connection.readyState);
if (mongoose.connection.readyState !== 1) {
	console.log("Establish new Connection to MongoDB");
	mongoose.connect(process.env.MONGO);
}

if (mongoose.connection.on) {
	console.log("Connected to MongoDB");
} else {
	console.log("Connection with MongoDB is lost");
}

let dateList;
let resStatus;
let resInfo;

const handler = async (event) => {
	if (event.httpMethod === "OPTIONS") {
		console.log(event.httpMethod);
		return {
			statusCode: 200,
			headers: corsHeaders,
		};
	}
	try {
		const newDateList = JSON.parse(event.body);

		UpdatedDateList = await BlockedDatesModel.findOneAndUpdate(
			{
				listName: process.env.LISTNAME,
			},
			// { $set: event.body },
			{ $set: newDateList },
			{ new: true } // sends the new version of the data after update
		);
		if (UpdatedDateList) {
			dateList = UpdatedDateList.dateList;
			resStatus = 200;
			resInfo = JSON.stringify(dateList);
		} else {
			resStatus = 404;
			resInfo = JSON.stringify("No data found in blockeddates!!");
		}
	} catch (error) {
		return { statusCode: 500, body: error.toString() };
	}

	return {
		statusCode: resStatus,
		body: resInfo,
		headers: {
			...corsHeaders,
			"Content-Type": "application/json",
		},
	};
};

module.exports = { handler };
