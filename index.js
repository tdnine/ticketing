//environment
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

//require
const express = require('express')
const mongoose = require('mongoose')

//app
const app = express()

//bodyparser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//connect db
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB connected"));

mongoose.connection.on("error", err => console.log(`DB connection error : ${err.message}`));

//listen
app.listen(process.env.PORT, () => console.log(`App listening on port: ${process.env.PORT}`))


