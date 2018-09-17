// Non-transactional resolver, not desirable

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
  Mutation: {
    addPost: async (parent, args) => {
      // Add new post to dbPosts
      var newpost = new dbPost({
        _id: new mongoose.Types.ObjectId(),
        title: args.title,
        content: args.content,
        author: {
          id: args.author_id,
          first_name: args.author_first_name,
          last_name: args.author_last_name,
        }
      });
      const output = await newpost.save();
      // Update dbUsers with the new post against the author
      newpost = {
        id: output._id,
        title: args.title,
        content: args.content,
      };
      const output2 = await dbUser.findOneAndUpdate(
        { _id: args.author_id },
        { $push: { posts: newpost } },
      );
      return output;
    },
  },
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
