const mongoose = require('mongoose');
const fawn = require('fawn');
const dbPost = require('../../../models/dbPost');
const dbUser = require('../../../models/dbUser');

fawn.init(mongoose);

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
      const task = fawn.Task();
      // Add new post to dbPosts
      task.save(
        dbPost,
        {
          _id: new mongoose.Types.ObjectId(),
          title: args.title,
          content: args.content,
          slug: args.slug,
          reading_time: args.reading_time,
          published: args.published,
          title_secondary: args.title_secondary,
          meta_description: args.meta_description,
          excerpt: args.excerpt,
          events: {
            created_on: new Date(),
          },
          author: {
            id: args.author_id,
            first_name: args.author_first_name,
            last_name: args.author_last_name,
          }
        }
      );
      // Update author record in dbUsers
      task.update(
        dbUser,
        { _id: args.author_id },
        {$push: {posts:
          {
            id: {$ojFuture: '0._id'},
            title: args.title,
            content: args.content,
          }
        }}
      );
      const results = await task.run({useMongoose: true});
      return results[0];
    },
  },
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
