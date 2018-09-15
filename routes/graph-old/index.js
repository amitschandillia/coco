const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schemas-alt/schema');
const mongoose = require('mongoose');

const router = express.Router();

router.use('/', graphqlHTTP({
  schema, // Must be provided
  graphiql: true, // Enable GraphiQL when server endpoint is accessed in browser
}));

module.exports = router;
