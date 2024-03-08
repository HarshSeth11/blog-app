const { isValidObjectId, mongo, default: mongoose } = require("mongoose");
const Like = require("../models/like.model");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiError");
const Post = require("../models/post.modal");

module.exports.toggleLike = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    try {
        const like = await Like.findOneAndDelete({likeBy: req.user._id, post: postId});
    
        if(!like) {
            await Like.create({
                post: postId,
                likeBy: req.user._id
            });
    
            await Post.findByIdAndUpdate(
                postId,
                { $inc: { likes: 1 } }
            );
        }
        else if(like) {
            await Post.findByIdAndUpdate(
                postId,
                { $inc: { likes: -1 } }
            );
        }
    } catch (error) {
        throw new ApiError(500, "Internal Server Error", error)
    }

    return res
    .status(200)
    .json(new ApiResponse(200, "Like is toggled"));
});

module.exports.allLikedPosts = asyncHandler(async (req, res) => {

    if(!isValidObjectId(req.user._id)) {
        throw new ApiError(401, "You have to login in order to like this video");
    }

    const LikedPostsList = await Like.aggregate([
        {
            $match: {
                likeBy: req.user._id
            }
        },
        {
            $lookup: {
                from: "Post",
                localField: "post",
                foreignField: "_id",
                as: "posts"
            }
        },
        {
            $project: {
                likeBy: 0
            }
        }
    ]);

    if(!LikedPostsList) {
        throw new ApiError(404, "You have not liked any post so far");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, "All liked videos fethced successfully", LikedPostsList));
})