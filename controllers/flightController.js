const Flight = require('../models/flight');
const Destination = require('../models/destination');

module.exports = {
  index: async (req, res) => {
    try {
      const flights = await Flight.find({});
      res.render('flights/index', { flights });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },

  show: async (req, res) => {
    try {
      const flight = await Flight.findById(req.params.id);
      if (!flight) {
        throw new Error('Flight not found');
      }
      res.render('flights/show', { flight });
    } catch (err) {
      console.error(err);
      res.status(404).send('Flight not found');
    }
  },

  new: (req, res) => {
    res.render('flights/new');
  },

  create: async (req, res) => {
    try {
      const flight = new Flight(req.body);
      await flight.save();
      res.redirect('/flights');
    } catch (err) {
      console.error(err);
      res.status(400).send('Bad Request');
    }
  },

  addDestination: async (req, res) => {
    try {
      const flight = await Flight.findById(req.params.id);
      if (!flight) {
        throw new Error('Flight not found');
      }

      const destination = new Destination({
        airport: req.body.airport,
        arrival: req.body.arrival,
      });

      flight.destinations.push(destination);
      await flight.save();

      res.redirect(`/flights/${flight._id}`);
    } catch (err) {
      console.error(err);
      res.status(400).send('Bad Request');
    }
  },
};