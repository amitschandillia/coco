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
const resolveBooks = require('../resolvers/resolveBooks');

module.exports = {
  type: new GraphQLList(BookType),
  resolve: resolveBooks,
};
