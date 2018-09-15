const mongoose = require('mongoose');

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


module.exports = {
  // Queries
  Query: {
    authors: (parent, root, args, context) => dummyauthors,
    author: (root, args, context) => dummyauthors.find(obj => obj.id === args.id),
  },
  // Mutations
  // ...

  Author: {
    posts: (parent) => dummyposts.filter(obj => obj.authorid === parent.id),
  },
};
