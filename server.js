var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


require('dotenv').config();
const connectDB = require('./config/database');
const Flight = require('./models/flight'); 
const Ticket = require('./models/ticket'); 
const flightController = require('./controllers/flightController');
const ticketController = require('./controllers/ticketController');

connectDB();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const app = express();
const port = process.env.PORT || 3000;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.get('/flights', flightController.index);
app.get('/flights/new', flightController.new);
app.post('/flights', flightController.create);
app.get('/flights/:id', flightController.show);

app.get('/flights/:id/tickets/new', ticketController.new);
app.post('/flights/:id/tickets', ticketController.create);


app.get('/flights/:id/tickets/new', async (req, res) => {
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
});


app.get('/flights', (req, res) => {
  res.render('index');
});

app.get('/flights/new', (req, res) => {
  res.render('new');
});


app.get('/flights/:id', async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      throw new Error('Flight not found');
    }
    res.render('show', { flight });
  } catch (err) {
    console.error(err);
    res.status(404).send('Flight not found');
  }
});


app.get('/flights/:id', async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      throw new Error('Flight not found');
    }

    // Retrieve tickets for the flight
    const tickets = await Ticket.find({ flight: flight._id });

    res.render('show', { flight, tickets });
  } catch (err) {
    console.error(err);
    res.status(404).send('Flight not found');
  }
});


app.post('/flights/:id/tickets', async (req, res) => {
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
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


module.exports = app;