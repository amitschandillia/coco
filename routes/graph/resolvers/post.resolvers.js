const mongoose = require('mongoose');
const graphqlFields = require('graphql-fields');
const fawn = require('fawn');
const dbPost = require('../../../models/dbPost');
const dbUser = require('../../../models/dbUser');

fawn.init(mongoose);

module.exports = {
  // Queries
  Query: {
    posts: (root, args, context) => {
      const isPublished = (typeof args.isPublished == 'boolean' ? args.isPublished : true);
      return dbPost.find({'isPublished': isPublished});
    },
    post: (root, args, context) => {
      return dbPost.findById(args.id);
    },
  },
  // Mutations
  Mutation: {
    // Add a new post
    addPost: async (parent, args) => {
      const task = fawn.Task();
      // Add new post to dbPosts
      if(args.isPublished){
        events = {
          created_at: new Date(),
          last_modified_at: new Date(),
          published_at: new Date(),
        };
      } else {
        events = {
          created_at: new Date(),
          last_modified_at: new Date(),
        };
      }
      work = {
        posts: {
          id: {$ojFuture: '0._id'},
          title: args.title,
          isPublished: args.isPublished,
        }
      };
      task.save(
        dbPost,
        {
          _id: new mongoose.Types.ObjectId(),
          title: args.title,
          content: args.content,
          slug: args.slug,
          reading_time: args.reading_time,
          isPublished: args.isPublished,
          title_secondary: args.title_secondary,
          meta_description: args.meta_description,
          excerpt: args.excerpt,
          events: events,
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
        {$push: work}
      );
      const results = await task.run({useMongoose: true});
      return results[0];
    },

    // Update an existing post
    // updatePost: async (parent, args) => {},
  },
  Post: {
    author: (parent, args, context, ast) => {
      // Retrieve fields being queried
      const queriedFields = Object.keys(graphqlFields(ast));
      console.log('-------------------------------------------------------------');
      console.log('from Post:author resolver');
      console.log('queriedFields', queriedFields);
      // Retrieve fields returned by parent, if any
      const fieldsInParent = Object.keys(parent.author);
      console.log('fieldsInParent', fieldsInParent);
      // Check if queried fields already exist in parent
      const available = queriedFields.every((field) => fieldsInParent.includes(field));
      console.log('available', available);
      if(parent.author && available) {
        console.log('no query');
        return parent.author;
      } else {
        console.log('query db');
        return dbUser.findOne({'posts.id': parent.id});
      }
    },
  },
};
