const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const PurchaseSchema = new Schema({
    userID: String,
    stock: String,
    cost: String,
    amount: String,
    addressS: String,
    date: {
        type:String,
        default: Date.now()
    }
})

const Purchase = mongoose.model("Purchase", PurchaseSchema);

module.exports = Purchase;