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
const resolveAuthor = require('../resolvers/resolveAuthor');

module.exports = {
  type: AuthorType,
  args: { id: { type: GraphQLID } },
  resolve: resolveAuthor,
};
