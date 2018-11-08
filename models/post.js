const mongoose = require('mongoose');

const post = mongoose.model('post', {
  // user: String,
  description: String,
  content: String
});

module.exports = post;
