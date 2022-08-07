const { Router } = require('express')
const router = Router()
const ticketController = require('../controllers/ticketController')
const {verifyToken, authorizeRole} = require('../helpers/helpers')
const {newTicketValidator} = require('../validations/ticketValidation')

router.post('/new', verifyToken, authorizeRole(['admin']), newTicketValidator, ticketController.newTicket)

router.get('/all', ticketController.ticketList)

router.get('/', ticketController.ticketList)

router.post('/:ticketId/markasclosed', verifyToken, authorizeRole(['admin', 'employee']), ticketController.closeTicket)

module.exports = router