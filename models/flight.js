
const mongoose = require('mongoose');
const destinationSchema = require('./destination');

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United'],
    required: true,
  },
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'], 
    default: 'DEN',
  },
  flightNo: {
    type: Number,
    required: true,
    min: 10,
    max: 9999,
  },
  departs: {
    type: Date,
    default: () => new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  },
  destinations: [destinationSchema], 
});

module.exports = mongoose.model('Flight', flightSchema);