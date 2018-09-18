const express = require('express');
const router = express.Router();
const graphqlHTTP = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');

require('./scalars/DateTime');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');

const schema = makeExecutableSchema({ typeDefs, resolvers });
router.use('/', graphqlHTTP({
    schema,
    graphiql: true, // Disable once in production!
}));

module.exports = router;
