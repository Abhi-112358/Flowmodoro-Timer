const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const SessionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date()},
    cycle: { type: Number, required: true},
    focusDuration: { type: Number, required: true},
    breakDuration: { type: Number, required: true}
})

module.exports = mongoose.model("Session", SessionSchema);