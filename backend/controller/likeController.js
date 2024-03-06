const { isValidObjectId } = require("mongoose");
const Like = require("../models/like.model");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiError");

module.exports.toggleLike = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const user = req.user;

    const isLiked = await Like.findOne({
        $and: [
            post= postId,
            owner= user._id
        ]
    });

    if(isLiked) {
        await Like.findByIdAndDelete(isLiked._id);
    }
    else {
        await Like.create({post: postId, owner: user._id});
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
                owner: req.user._id
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
                owner: 0
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