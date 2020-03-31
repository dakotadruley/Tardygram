const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/auth', require('./routes/auth'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;

// User model - 4 points
// Auth routes - 4 points
// Post setup (routes and model) 5 points
// Comment setup (routes and model) 5 points
// Aggregations - 2 points (1 point per aggregation)
