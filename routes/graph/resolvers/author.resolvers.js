const mongoose = require('mongoose');
const graphqlFields = require('graphql-fields');
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
    posts: (parent, args, context, ast) => {
      // Retrieve fields being queried
      const queriedFields = Object.keys(graphqlFields(ast));
      console.log('-------------------------------------------------------------');
      console.log('from Author:posts resolver');
      console.log('queriedFields', queriedFields);
      // Retrieve fields returned by parent, if any
      const fieldsInParent = Object.keys(parent.posts[0]._doc);
      console.log('fieldsInParent', fieldsInParent);
      // Check if queried fields already exist in parent
      const available = queriedFields.every((field) => fieldsInParent.includes(field));
      console.log('available', available);
      const isPublished = (typeof args.isPublished == 'boolean' ? args.isPublished : true);
      if(parent.posts && available) {
        // If parent data is available and includes queried fields, no need to query db
        return parent.posts.filter(elem => elem.isPublished == isPublished);
      } else {
        // Otherwise, query db and retrieve data
        return dbPost.find({'author.id': parent.id, 'isPublished': isPublished});
      }
    },
  },
};
