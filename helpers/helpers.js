
/* exports.verifyToken = (req, res, next) => {    
    const token = req.cookies.coapp     
          
    if (!token)              
        return res.status(401).render('error', {message: `A token is required for authentication`, statusCode: '403'})            
    
    try{
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY) 
        req.user = decoded
    }catch(err){                
        return res.render('error', {message: `Invalid Token`, statusCode: '401'})        
    }
    next()
} */

// ----------------------------------------------------------------------------------------------- //

/* exports.authorizeRole = (role) =>{  
    let debug = require('debug')('c_app: authorizeRole')
    return async (req, res, next) => {                      
        if(role.indexOf(req.user.role) == -1){            
            return res.status(403).render('error', {message: `This page is not availaible for you`, statusCode: '403'})
        }
                    
        next()
    }
} */


  // --------------------------------------------- UPPERCASE REGEX CHECK ----------------------------------------- //

  exports.regexUpperCase = (arr, value) => {
    let checkArr = arr.map(item => {
      let regex = new RegExp(`(?:^|\W)${item}(?:$|\W)`,'i')
      return regex.test(value)
    })
    return checkArr
  }

 