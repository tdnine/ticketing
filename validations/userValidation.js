const { check } = require('express-validator')
const User = require('../model/userModel')
const {regexUpperCase} = require('../helpers/helpers')
const debug = require('debug')('ticketing: userValidation')

exports.newUserValidator = [
    check('username', 'Please enter Username').trim().isLength({min: 1}),
    check('username').custom(async (value, req) => {
        await checkDuplicateUser(value, req)
    }),    
    check('role').custom(value => {        
        let allowedRoles = ['admin', 'employee']
        
        if(!allowedRoles.includes(value)) return Promise.reject('Role is required and can only be admin or employee')        
        if(allowedRoles.includes(value)) return true
    })
]


// ----------------------------- FUNCTION ------------------------------- //
async function checkDuplicateUser(value, req){
        
    //GET ARRAY OF ALL USERNAMES//
    let userlist = await User.find().select('username') //
    userlist = userlist.map(user => user.username)

    //GET BOOLEAN ARR OF MATCHED USERNAMES//
    let checkArr = regexUpperCase(userlist,value)

    //IF ARRAY CONTAINS TRUE, RENDER ERROR//
    if (checkArr.indexOf(true) != -1) 
        return Promise.reject('User already exists')
    
}