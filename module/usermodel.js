const mongoose = require("mongoose")

const plm = require("passport-local-mongoose")

const userdata = new mongoose.Schema({
    username: String,
    email: String,
    mobile: Number,
    password: String,
    budget: Number,
    otp: {
        type: String,
        default: -1
    },

    userexpenses: [{type: mongoose.Schema.Types.ObjectId , ref: "userexpenses"}]
})

userdata.plugin(plm)

module.exports = mongoose.model("USERDATA" , userdata)