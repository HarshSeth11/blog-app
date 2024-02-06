const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { uploadOnCloudinary } = require("../utils/cloudinary");
const  Post  = require("../models/post.modal")


module.exports.createBlog_Post = asyncHandler( async (req, res, next) => {
    // Destructure all the data from the req body
    // check if all the data is present
    // check if thumbnail is present.
    // upload thumbnail on cloudinary.
    // check if it is successfully uploaded
    // create a entry in the db.
    // check if post is created if not send server error
    // return response to the user

    const { title, body, category } = req.body;

    if( [title, body, category].some((item) => (item === null || item === undefined || item.trim() === ""))) {
        throw new ApiError(400, "All Fields are required.");
    }

    const thumbnailLocalPath = req.file?.path;
    
    if(!thumbnailLocalPath) {
        throw new ApiError(400, "Thumbnail is Required");
    }

    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

    if(!thumbnail) {
        throw new ApiError(400, "Thumbnail is Required");
    }

    const post = await Post.create({
        title,
        body,
        thumbnail : thumbnail.url,
        category
    });

    const createdPost = await Post.findOne({ _id: post._id });

    if(!createdPost) throw new ApiError(500, "There is some problem at the server end.");

    res.status(201).json(
        new ApiResponse(200, "Post is Created", createdPost)
    );

    res.end;
})
