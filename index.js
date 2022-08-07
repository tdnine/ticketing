//environment
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

//require
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const errorHandler = require('./errorHandler')

//app
const app = express()

//route import
const userRouter = require('./routes/user')
const ticketRouter = require('./routes/ticket')

//write morgan logs to a file
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

//bodyparser, morgan middleware
app.use(morgan('combined', { stream: accessLogStream }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//routes
app.use('/users', userRouter)
app.use('/tickets', ticketRouter)

// Error Handling middleware
app.use(errorHandler.logErrors)
app.use(errorHandler.requestNotMatch)

//connect db
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB connected"));

mongoose.connection.on("error", err => console.log(`DB connection error : ${err.message}`));

//listen
app.listen(process.env.PORT, () => console.log(`App listening on port: ${process.env.PORT}`))


