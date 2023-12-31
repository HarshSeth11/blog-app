const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogPosts = new Schema({
    title: {
        type: String,
        required : [true, "Title is Required"],
    },
    author: {
        type: String,
        required : true,
    },
    body: {
        type: String,
        required : [true, "Body is Required"],
    },
    catogery: String,
    dateCreated : {
        type: Date,
        default: new Date(),
    },
    comments: [String]
});

module.exports =  mongoose.model('post', blogPosts);