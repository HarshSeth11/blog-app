const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const {isValidObjectId} = require('mongoose');
const {
  uploadOnCloudinary,
  deleteFromCloudinary,
} = require("../utils/cloudinary");
const Post = require("../models/post.modal");

module.exports.createBlog_Post = asyncHandler(async (req, res) => {
  // Destructure all the data from the req body
  // check if all the data is present
  // check if thumbnail is present.
  // upload thumbnail on cloudinary.
  // check if it is successfully uploaded
  // create a entry in the db.
  // check if post is created if not send server error
  // return response to the user

  const { title, body, category } = req.body;

  if (
    [title, body, category].some(
      (item) => item === null || item === undefined || item.trim() === ""
    )
  ) {
    throw new ApiError(400, "All Fields are required.");
  }

  const thumbnailLocalPath = req.file?.path;

  if (!thumbnailLocalPath) {
    throw new ApiError(400, "Thumbnail is Required");
  }

  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

  if (!thumbnail) {
    throw new ApiError(400, "Thumbnail is Required");
  }

  const post = await Post.create({
    title,
    body,
    thumbnail: thumbnail.url,
    category,
  });

  const createdPost = await Post.findById(post._id);

  if (!createdPost)
    throw new ApiError(500, "There is some problem at the server end.");

  return res
    .status(201)
    .json(new ApiResponse(200, "Post is Created", createdPost));
});

module.exports.getAllPosts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, sortBy, sortType } = req.query;

  const blogs = await Post.aggregate([
    {
      $sort: {
        [sortBy]: sortType === "desc" ? -1 : 1,
      },
    },
    {
      $skip: (page - 1) * limit,
    },
    {
      $limit: limit,
    },
  ]);

  if (!blogs) {
    throw new ApiError(404, "No Post found");
  }

  return res.json(200).json(new ApiResponse(200, "Posts fetched successfully"));
});

module.exports.updatePostDetails = asyncHandler(async (req, res) => {
  const { title, body, category } = req.body;
  const { postId } = req.params;

  const updateobj = {};

  if (title.trim() !== "") {
    updateobj["title"] = title;
  }
  if (body.trim() !== "") {
    updateobj["body"] = body;
  }
  if (category.trim() !== "") {
    updateobj["category"] = category;
  }

  const blog = await Post.findByIdAndUpdate(
    postId,
    { updateobj },
    { new: true }
  );

  if (!blog) {
    throw new ApiError(400, "No blog found to update");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Post is updated successfully", blog));
});

module.exports.changeThumbnail = asyncHandler(async (req, res) => {
  // To Do: I need to implement the functionality of deleting the previous thumbnail from cloudinary before updating
  const { postId } = req.params;
  const thumbnailLocalPath = req.file?.path;

  if (!thumbnailLocalPath) {
    throw new ApiError(400, "Thumbnail is Required");
  }

  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

  if (!thumbnail) {
    throw new ApiError(400, "Thumbnail is Required");
  }

  const { thumbnailToBeDeleted } = await Post.findById(postId);

  await deleteFromCloudinary(thumbnailToBeDeleted);

  const blog = await Post.findByIdAndUpdate(
    postId,
    { thumbnail },
    { new: true }
  );

  if (!blog) throw new ApiError(400, "No blog found to update");

  return res
    .status(201)
    .json(new ApiResponse(200, "Thumbnail is updated", blog));
});

module.exports.deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const deletedPost = await Post.findByIdAndDelete(postId);

  await deleteFromCloudinary(deletedPost.thumbnail);

  if (!deletedPost) {
    throw new ApiError(400, "No post exists to delete");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Post is deleted Successfully"));
});

module.exports.getPostById = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  if(!isValidObjectId(postId)) {
    throw new ApiError(400, "Post doesn't exists");
  }
  
  const post = await Post.findById(postId);
  
  if(!post) {
    throw new ApiError(400, "Post doesn't exists");
  }

  return res
  .status(200)
  .json(
    new ApiResponse(200, "Post fetched Successfully", post)
  );
});

