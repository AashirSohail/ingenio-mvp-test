const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
    userID: String,
    address: String,
})

const user = mongoose.model("user", userSchema);

module.exports = user;