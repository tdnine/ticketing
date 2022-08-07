const { Router } = require('express')
const router = Router()
const userController = require('../controllers/userController')
const {newUserValidator} = require('../validations/userValidation')

router.post('/new', newUserValidator, userController.newUser)

module.exports = router