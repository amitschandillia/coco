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

module.exports = (parent, args) => {
  // code to get data from db
  return Author.findById(args.id);
};
