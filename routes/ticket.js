const { Router } = require('express')
const router = Router()
const ticketController = require('../controllers/ticketController')
const {verifyToken, authorizeRole} = require('../helpers/helpers')
const {newTicketValidator} = require('../validations/ticketValidation')

router.post('/new', verifyToken, authorizeRole(['admin']), newTicketValidator, ticketController.newTicket)

module.exports = router