const mongoose = require("mongoose");

const AgendaSchema = new mongoose.Schema(
	{
		agendaName: {
			type: String,
			default: "agenda_De-Borgh-Hoeve",
			required: true,
		},
		agendaUrl: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);
// export a mongoose model giving its name and the schema used to create it.
const AgendaModel = mongoose.model("agendas", AgendaSchema);

module.exports = AgendaModel;
