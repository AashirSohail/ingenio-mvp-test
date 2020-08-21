const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const addressSchema = new Schema({
    userID: String,
    address: String,
})

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;