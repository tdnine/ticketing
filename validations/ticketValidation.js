const { check } = require('express-validator')
const debug = require('debug')('ticketing: ticketValidation')

exports.newTicketValidator = [
    check('title', 'Please enter Title').trim().isLength({min: 1}),
    check('description', 'Please enter Description').trim().isLength({min: 1})    
]

