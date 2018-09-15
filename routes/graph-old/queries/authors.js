const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');
const Book = require('../../../models/book');
const Author = require('../../../models/author');
const {BookType, AuthorType} = require('../types');
const resolveAuthors = require('../resolvers/resolveAuthors');

module.exports = {
  type: new GraphQLList(AuthorType),
  resolve: resolveAuthors,
};
