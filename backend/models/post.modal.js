const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentBy = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    text: String
});
  

const blogPosts = new Schema({
    title: {
        type: String,
        required : [true, "Title is Required"],
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    body: {
        type: String,
        required : [true, "Body is Required"],
    },
    thumbnail: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    comments: [commentBy],
});

module.exports =  mongoose.model('Post', blogPosts);