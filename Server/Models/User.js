const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const UserSchema = new Schema({
    email: { type: String, required: true},
    sessions: [{ type: Schema.Types.ObjectId, ref: "Session", default: []}],
})

module.exports = mongoose.model("User", UserSchema);