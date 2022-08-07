let debug = require('debug')('ticketing: ticketController')
const User = require('../model/userModel')
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

        //ASSIGN TICKET TO RANDOMLY SELECTED EMPLOYEE
        const employees = await User.find({role: 'employee'}).select('username')
        const employeeIds = employees.map(item => item._id)
        const randomId = Math.floor((Math.random() * employeeIds.length))

        //SAVE NEW USER TO DB
        const newTicket = new Ticket({ title, description, assignedTo: employeeIds[randomId] })
        const createdTicket = await newTicket.save()

        //RETURN AUTH TOKEN
        res.status(201).json({id: createdTicket._id})                
    }catch(err){
        next(err)
    }    
}

exports.ticketList = async(req, res, next) => {
    try{        
        
        //CHECK IF QUERY
        const {status, title, priority} = req.query
        
        //INTIATE FILTER
        let filter 
        
        //ASSIGN FILTER OBJECT ACCORDING TO QUERY ELSE, EMPTY FILTER OBJECT
        (status) ? filter = {status} 
        : (title) ? filter = {title}
        : (priority) ? filter = {priority}        
        : filter = {}

        //GET TICKETS ACCORDING TO FILTER
        const tickets = await Ticket.find(filter)
        return res.status(200).json(tickets)

    }catch(err){
        next(err)
    }
}

exports.closeTicket = async(req, res, next) => {
    try{
        const {ticketId} = req.body
        
        //GET PRIORITY OF CURRENT TICKET ID
        const ticket = await Ticket.findById(ticketId)
        const currentTicketPriority = ticket.priority            
        
    // -------- PRIORITY CHECK --------------
        
        //GET PRIORITY OF ALL TICKETS OF THAT EMPLOYEE MINUS THE CURRENT TICKET
        const employeeId = ticket.assignedTo
        const employeeTickets = await Ticket.find({assignedTo: employeeId})
        
        const priorityCheckList = employeeTickets.filter(item => item._id != ticketId).map(item => item.priority)               
        
        //CHECK FOR LOW PRIORITY TICKETS       
        if(currentTicketPriority == 'low'){            
            if(priorityCheckList.includes('medium') || priorityCheckList.includes('high')){
                let higherPriorityTickets = []
                
                higherPriorityTickets = employeeTickets.filter(item => item.priority != 'low')       
                return res.status(200).json({msg: 'A higher priority task remains to be closed', tickets: higherPriorityTickets})     
            }
        }
        
        //CHECK FOR MEDIUM PRIORITY TICKETS
        if(currentTicketPriority == 'medium' && priorityCheckList.includes('high')){                      
            let higherPriorityTickets = []
            
            higherPriorityTickets = employeeTickets.filter(item => item.priority == 'high')    
            return res.status(200).json({msg: 'A higher priority task remains to be closed', tickets: higherPriorityTickets})         
        }
        
        //IF NO ERROR, CLOSE TICKET        
        await Ticket.findByIdAndUpdate(ticketId, {status: 'close'})
        return res.status(200).json({msg: 'Ticket closed successfully'})
        

    }catch(err){
        next(err)
    }
}

exports.deleteTicket = async(req, res, next) => {
    try{
        const {ticketId} = req.body

        await Ticket.findByIdAndDelete(ticketId)
        res.status(200).json({msg: 'Ticket deleted successfully'})
    }catch(err){
        next(err)
    }
}