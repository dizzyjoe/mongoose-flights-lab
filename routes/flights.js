
const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');


router.get('/flights', flightController.index);

router.get('/flights/:id', flightController.show);

router.get('/flights/new', flightController.new);

router.post('/flights', flightController.create);

router.post('/flights/:id/destinations', flightController.addDestination);

module.exports = router;