const express = require('express');

const router = express.Router();

function getRouteHandler(req, res) {
  // handle GET route here
  res.send('Welcome to graph!');
}

function postRouteHandler(req, res) { // eslint-disable-line no-unused-vars
  // handle POST route here
}

router.route('/')
  .get(getRouteHandler)
  .post(postRouteHandler);

module.exports = router;
