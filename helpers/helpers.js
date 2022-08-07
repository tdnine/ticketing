const jwt = require('jsonwebtoken')
const User = require('../model/userModel')
const Ticket = require('../model/ticketModel')

exports.verifyToken = (req, res, next) => {   
    const debug = require('debug')('ticketing: verifyToken') 
    const token = req.headers['authorization']
    debug(token)
          
    if (!token)              
        return res.status(401).json({msg: `A token is required for authentication`})            
    
    try{
        const fragment = token.split(" ")[1]
        debug(fragment)
        const decoded = jwt.verify(fragment, process.env.ACCESS_TOKEN_SECRET_KEY)         
        req.user = decoded
    }catch(err){                
        return res.status(401).json({msg: `Invalid Token`})           
    }
    next()
}

// ----------------------------------------------------------------------------------------------- //

exports.authorizeRole = (role) =>{  
    
    return async (req, res, next) => {                      
        if(role.indexOf(req.user.role) == -1){            
            return res.status(403).json({msg: `This resource is not availaible for you`})
        }
                    
        next()
    }
}

exports.authorizeResource = async (req, res, next) => {                      
    try{
        const debug = require('debug')('ticketing: authorizeResource') 
        //GET LOGGED IN USER
        let username = req.user.username
        let user = await User.findOne({username})        
    
        //GET RESOURCE INFO
        let ticket = await Ticket.findById(req.params.ticketId).populate('assignedTo')
                
        //CHECK IF RESOURCE AUTHORIZED
        return (JSON.stringify(ticket.assignedTo._id) == JSON.stringify(user._id) || user.role == 'admin') 
        ? next()      
        : res.status(403).json({msg: `Resource Not Authorized`})
                         
    }catch(err){
        next(err)
    }          
}


  // --------------------------------------------- UPPERCASE REGEX CHECK ----------------------------------------- //

  exports.regexUpperCase = (arr, value) => {
    let checkArr = arr.map(item => {
      let regex = new RegExp(`(?:^|\W)${item}(?:$|\W)`,'i')
      return regex.test(value)
    })
    return checkArr
  }

 