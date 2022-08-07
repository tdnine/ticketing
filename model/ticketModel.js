const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ticketSchema = new Schema({
    title: {
        type: String,    
        trim: true,    
        required: true
    },    
    description: {
        type: String,
        required: true,
        trim: true,        
    },
    status: {
        type: String,
        enum: ['open', 'close'],
        default: 'open',
        required: true
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low',
        required: true
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const Ticket = mongoose.model('Ticket', ticketSchema)

module.exports = Ticket