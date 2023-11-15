const mongoose = require("mongoose")

const expenses = new mongoose.Schema({

    catagory: String,
    subcatagory: String,
    expansesname: String,
    expenseamount: Number,
    user: {type: mongoose.Schema.Types.ObjectId , ref: "USERDATA"}
}
)

module.exports = mongoose.model("userexpenses" , expenses)