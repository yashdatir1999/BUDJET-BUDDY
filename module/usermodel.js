const mongoose = require("mongoose")

const plm = require("passport-local-mongoose")

const userdata = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    otp: {
        type: String,
        default: -1
    }
})

userdata.plugin(plm)

module.exports = mongoose.model("USERDATA" , userdata)