const express = require('express');

const router = express.Router();

const graphqlHTTP = require('express-graphql');

router.use('/', graphqlHTTP({
  
}));

module.exports = router;
