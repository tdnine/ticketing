const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    role: {
        type: String,
        enum: ['admin', 'employee'],
        required: true
    },    
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

module.exports = User