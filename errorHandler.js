const debug = require('debug')('ticketing: errorHandler')

exports.logErrors = (err, req, res, next) => {        
    return res.status(500).json({msg: 'Something broke!', err: err.message})
}

exports.requestNotMatch = (req, res, next) =>{        
    return res.status(404).json({msg: 'Route not found on the server'})
}


