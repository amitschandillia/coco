const {
  GraphQLSchema,
  GraphQLObjectType,
} = require('graphql');
const Book = require('../../../models/book');
const Author = require('../../../models/author');

const queries = require('./queries');

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: queries,
  }),
});
