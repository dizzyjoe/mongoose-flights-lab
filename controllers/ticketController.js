
const Ticket = require('../models/ticket');
const Flight = require('../models/flight'); // Import the Flight model if not already done

module.exports = {
  new: async (req, res) => {
    try {
      const flight = await Flight.findById(req.params.id);
      if (!flight) {
        throw new Error('Flight not found');
      }
      res.render('tickets/new', { flight });
    } catch (err) {
      console.error(err);
      res.status(404).send('Flight not found');
    }
  },

  create: async (req, res) => {
    try {
      const flight = await Flight.findById(req.params.id);
      if (!flight) {
        throw new Error('Flight not found');
      }

      const ticket = new Ticket({
        seat: req.body.seat,
        price: req.body.price,
        flight: flight._id,
      });

      await ticket.save();

      res.redirect(`/flights/${flight._id}`);
    } catch (err) {
      console.error(err);
      res.status(404).send('Flight not found');
    }
  },

  
};