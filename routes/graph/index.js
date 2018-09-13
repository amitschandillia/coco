const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schemas/schema');
const mongoose = require('mongoose');

const router = express.Router();

router.use('/', graphqlHTTP({
  schema,
  graphiql: true
}));

module.exports = router;
