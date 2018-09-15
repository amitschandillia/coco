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
const resolveBook = require('../resolvers/resolveBook');

module.exports = {
  type: BookType,
  args: { id: { type: GraphQLID } },
  resolve: resolveBook,
};
