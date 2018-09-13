const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  name: String,
  genre: String,
  authorId: String
});

module.exports = mongoose.model('Book', bookSchema);
