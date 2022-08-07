let debug = require('debug')('ticketing: userController')
const User = require('../model/userModel')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.newUser = async (req, res, next) => {
    try{
        //VALIDATION//
        const errors = validationResult(req)
        
        if(!errors.isEmpty()) {                        
            const alert = errors.array()  
            return res.status(400).json({msg: 'Validation Error', err: alert})
        }

        //GET BODY DATA
        const {username, role} = req.body
        
        //GENERATE JWT TOKEN                    
        const token = jwt.sign( req.body, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn : '1h'} )

        //SAVE NEW USER TO DB
        const newUser = new User({ role, username })
        await newUser.save()

        //RETURN AUTH TOKEN
        res.status(201).json({authToken: token})
    }catch(err){
        next(err)
    }    
}