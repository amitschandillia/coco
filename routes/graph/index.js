const express = require('express');
const router = express.Router();
const graphqlHTTP = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const mongoose = require('mongoose');

const typeDefs = require('./schemas');
// const resolvers = require('./resolvers');


// dummy data
const dummyposts = [
  {id: '1', title: 'My First Post', body: 'Lorem ipsum dolor sit.', authorid: '1'},
  {id: '2', title: 'My Second Post', body: 'Duis aute irure dolor.', authorid: '2'},
  {id: '3', title: 'My Third Post', body: 'Excepteur sint occaecat cupidatat non proident.', authorid: '2'},
  {id: '4', title: 'My Fourth Post', body: 'Ut enim ad minim veniam.', authorid: '1'},
  {id: '5', title: 'My Fifth Post', body: 'The passage is attributed to an unknown typesetter in the 15th century.', authorid: '1'},
];
const dummyauthors = [
  {id: '1', name: 'John Doe'},
  {id: '2', name: 'Mark Twain'},
];


// resolver functions
const posts = (root, args, context) => {
  return dummyposts;
}
const post = (root, args, context) => {
  return dummyposts.find(obj => obj.id === args.id);
}
const authors = (parent, root, args, context) => {
  return dummyauthors;
}
const author = (root, args, context) => {
  return dummyauthors.find(obj => obj.id === args.id);
}
const postAuthor = (parent) => {
  return dummyauthors.find(obj => obj.id === parent.authorid);
}
const authorPosts = (parent) => {
  return dummyposts.filter(obj => obj.authorid === parent.id);
}


// resolver map
const resolvers = {
  Query: {
    posts,
    post,
    authors,
    author,
  },
  Post: {
    author: postAuthor,
  },
  Author: {
    posts: authorPosts,
  },
  // mutation resolvers
};





// pass the resolver map as second argument
const schema = makeExecutableSchema({ typeDefs, resolvers });
router.use('/', graphqlHTTP({
    schema,
    graphiql: true, // Disable once in production!
}));











module.exports = router;
