const mongoose = require('mongoose');
const dbPost = require('../../../models/dbPost');
const dbUser = require('../../../models/dbUser');

module.exports = {
  // Queries
  Query: {
    posts: (root, args, context) => {
      return dbPost.find({});
    },
    post: (root, args, context) => {
      return dbPost.findById(args.id);
    },
  },
  // Mutations
  // ...

  Post: {
    author: (parent) => {
      if(parent.author) {
        return parent.author;
      } else {
        return dbUser.findOne({'posts.id': parent.id});
      }
    },
  },
};
