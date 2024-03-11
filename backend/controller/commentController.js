const { isValidObjectId } = require("mongoose");
const mongoose = require("mongoose");
const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiError");
const Comment = require("../models/comment.model");
const { ApiResponse } = require("../utils/ApiResponse");

module.exports.getPostComments = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    if (!isValidObjectId(postId)) {
        throw new ApiError(404, "Post not found");
    }

    let comments;
    try {
        const pipeline = [
            {
                $match: {
                    post: mongoose.Types.ObjectId(postId) // Ensure postId is converted to ObjectId
                }
            },
            {
                $sort: { createdAt: -1 } // Optional: Sort by createdAt descending
            },
            {
                $skip: (parseInt(page) - 1) * parseInt(limit)
            },
            {
                $limit: parseInt(limit)
            }
        ];

        comments = await Comment.aggregate(pipeline);
    } catch (error) {
        throw new ApiError(500, "Internal Server Error", error);
    }

    return res.status(200).json(
        new ApiResponse(200, comments.length > 0 ? "Comments fetched successfully" : "There are no comments on this post right now", comments)
    );
});

module.exports.addComment = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;

    if(!isValidObjectId(postId)) {
        throw new ApiError(404, "Post doesn't not exists.");
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


    if(!isValidObjectId(commentId)) {
        throw new ApiError(400, "comment id is incorrect!");
    }

    if(!content || content.trim() == "") {
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