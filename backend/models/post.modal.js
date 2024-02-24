const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2')

const commentBy = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    text: String
});
  

const blogSchema = new Schema({
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

blogSchema.plugin(mongooseAggregatePaginate);

module.exports =  mongoose.model('Post', blogSchema);