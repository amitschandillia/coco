const mongoose = require('mongoose');
const dbUser = require('../../../models/dbUser');
const dbPost = require('../../../models/dbPost');

module.exports = {
  // Queries
  Query: {
    authors: (parent, root, args, context) => {
      return dbUser.find({});
    },
    author: (root, args, context) => {
      return dbUser.findById(args.id);
    },
  },
  // Mutations
  // ...

  Author: {
    posts: (parent) => {
      if(parent.posts) {
        return parent.posts;
      } else {
        return dbPost.find({'author.id': parent.id});
      }
    },
  },
};
