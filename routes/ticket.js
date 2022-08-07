const { Router } = require('express')
const router = Router()
const ticketController = require('../controllers/ticketController')
const {verifyToken, authorizeRole, authorizeResource} = require('../helpers/helpers')
const {newTicketValidator} = require('../validations/ticketValidation')

router.post('/new', verifyToken, authorizeRole(['admin']), newTicketValidator, ticketController.newTicket)

router.get('/all', ticketController.ticketList)

router.get('/', ticketController.ticketList)

router.post('/markasclosed', verifyToken, authorizeResource, ticketController.closeTicket)

router.post('/delete', verifyToken, authorizeRole(['admin']), ticketController.deleteTicket)

module.exports = router