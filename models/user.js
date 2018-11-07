const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    name: {
        type: String,
        required: [true, "The name field is required"]
    },
    email: {
        type: String,
        required: [false, "The Email field is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "The Password field is required"]
    },
    bio: String,
    photo: String,
});

module.exports = mongoose.model('user', userSchema);
