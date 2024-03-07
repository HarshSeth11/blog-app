const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2');
  

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
    likes: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
});

blogSchema.plugin(mongooseAggregatePaginate);

module.exports =  mongoose.model('Post', blogSchema);