const mongoose = require("mongoose")

const userdata = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    otp: {
        type: String,
        default: -1
    }
})

module.exports = mongoose.model("USERDATA" , userdata)