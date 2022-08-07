let debug = require('debug')('ticketing: ticketController')
const Ticket = require('../model/ticketModel')
const { validationResult } = require('express-validator')

exports.newTicket = async (req, res, next) => {
    try{
        //VALIDATION//
        const errors = validationResult(req)
        
        if(!errors.isEmpty()) {                        
            const alert = errors.array()  
            return res.status(400).json({msg: 'Validation Error', err: alert})
        }

        //GET BODY DATA//
        const { title, description } = req.body

        //SAVE NEW USER TO DB
        const newTicket = new Ticket({ title, description })
        const createdTicket = await newTicket.save()

        //RETURN AUTH TOKEN
        res.status(201).json({id: createdTicket._id})                
    }catch(err){
        next(err)
    }    
}