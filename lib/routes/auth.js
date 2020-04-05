const { Router } = require('express');
const User = require('../models/User');
const ensureAuth = require('../middleware/ensure-auth');

const ONE_DAY = 1000 * 60 * 60 * 24;

const handleAuthorization = (res, user) => {
  const token = user.authToken();

  res.cookie('session', token, {
    maxAge: ONE_DAY,
    httpOnly: true
  });
  res.send(user);
};

module.exports = Router()
  .post('/signup', (req, res, next) => {
    User
      .create(req.body)
      .then(user => handleAuthorization(res, user))
      .catch(next);
  })

  .post('/login', (req, res, next) => {
    User
      .authorize(req.body)
      .then(user => handleAuthorization(res, user))
      .catch(next);
  })

  .get('/verify', ensureAuth, (req, res) => {
    res.send(req.user);
  });
