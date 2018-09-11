const express = require('express');

const router = express.Router();

function getRouteHandler(req, res) {
  // handle GET route here
  res.send('Restricted area: Admins only');
}

function postRouteHandler(req, res) { // eslint-disable-line no-unused-vars
  // handle POST route here
}

router.route('/')
  .get(getRouteHandler)
  .post(postRouteHandler);

module.exports = router;
