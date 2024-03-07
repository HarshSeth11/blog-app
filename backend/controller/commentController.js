const { isValidObjectId, default: mongoose } = require("mongoose");
const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiError");
const Comment = require("../models/comment.model");
const { ApiResponse } = require("../utils/ApiResponse");

module.exports.getPostComments = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    let comments
    try {
        comments = await Comment.aggregate([
            {
                $match: {
                    post: mongoose.Schema.Types.ObjectId(postId)
                }
            },
            {
                $skip: (page-1) * limit
            },
            {
                $limit: limit
            }
        ]);
    } catch (error) {
        throw new ApiError(500, "Internal Server Error");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, comments.length > 0? "Comments fetched successfully" : "There are not comments on this post right now", comments.length > 0? comments : {})
    );
})

module.exports.addComment = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;

    if (!isValidObjectId(postId) || !isValidObjectId(req.body._id)) {
        throw new ApiError(401, "You are not authorized to comment on this video");
    }

    if (content.trim() === "") {
        throw new ApiError(400, "Content is required");
    }

    const comment = await Comment.create({
        content,
        owner: req.body._id,
        post: postId
    });

    return res
    .status(200)
    .json(
        new ApiResponse(200, "Comment posted Successfully", comment)
    );
});

module.exports.editComment = asyncHandler(async (req, res) => {
    const {postId, commentId} = req.params;
    const { content } = req.body;

    if(!isValidObjectId(postId) || !isValidObjectId(commentId)) {
        throw new ApiError(400, "either post id or comment id is incorrect!");
    }

    if(content.trim() == "") {
        throw new ApiError(400, "Content is required.");
    }

    const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        {
            content
        },
        {
            new: true
        }
    );

    if(!updatedComment) {
        throw new ApiError(500, "Server side error while updating comment");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, "Comment is updated Successfully", updatedComment)
    );
})

module.exports.deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    if(!isValidObjectId(commentId)) {
        throw new ApiError(400, "Comment id is incorrect");
    }

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if(!deletedComment) {
        throw new ApiError(500, "Server side Error while deleting Comment");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, "Comment is deleted Successfully", deletedComment)
    );
});