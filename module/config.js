const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/EXPENSESTRACKER")

.then(() => console.log("EXPENSES TRACKER DB CONNECTED"))
.catch((err) => console.log(err))