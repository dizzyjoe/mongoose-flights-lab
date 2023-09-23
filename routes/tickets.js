const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');


router.get('/flights/:id/tickets/new', ticketController.new);


router.post('/flights/:id/tickets', ticketController.create);

module.exports = router;
