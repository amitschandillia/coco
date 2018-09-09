const express = require('express');
const router = express.Router();

router.route('/')
    .get(getRouteHandler)
    .post(postRouteHandler);

function getRouteHandler(req, res) {
    //handle GET route here
      res.send('Restricted area: Admins only');
}

function postRouteHandler(req, res) {
    //handle POST route here
}

module.exports = router;
