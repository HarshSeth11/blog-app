const { Schema, default: mongoose } = require("mongoose")
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate-v2');

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

commentSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model("Comment", commentSchema);