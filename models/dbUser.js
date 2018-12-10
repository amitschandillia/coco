const mongoose = require('mongoose');

const userPost = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
  }
},{ _id : false });

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  posts: [userPost],
});

module.exports = mongoose.model('dbUser', userSchema);
