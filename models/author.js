const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  name: String,
  age: Number,
});

module.exports = mongoose.model('Author', authorSchema);
