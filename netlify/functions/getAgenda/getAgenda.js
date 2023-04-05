const dotenv = require("dotenv");
dotenv.config();

// Cors setup
const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Headers":
		"Origin, X-Requested-With, Content-Type, Accept",
	"Access-Control-Allow-Methods": "GET",
};

const mongoose = require("mongoose");
const AgendaModel = require("../../../models/Agendas.js");

console.log("MongoDB ready state: ", mongoose.connection.readyState);
if (mongoose.connection.readyState !== 1) {
	console.log("Establish a new Connection to MongoDB");
	mongoose.connect(process.env.MONGO);
}

if (mongoose.connection.on) {
	console.log("Connected to MongoDB");
} else {
	console.log("Connection with MongoDB is lost");
}

let agendaInfo;
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
		agendaInfo = await AgendaModel.findOne({
			agendaName: process.env.AGENDANAME,
		});
	} catch (error) {
		return { statusCode: 500, body: error.toString() };
	}

	if (agendaInfo) {
		resStatus = 200;
		resInfo = JSON.stringify(agendaInfo);
	} else {
		resStatus = 404;
		resInfo = JSON.stringify("No url data found in agendaInfo!!");
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
