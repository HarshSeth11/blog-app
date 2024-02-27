const jwt = require('jsonwebtoken');
const { ApiError } = require('../utils/ApiError');
const User = require('../models/user.modal.js');
const { asyncHandler } = require('../utils/asyncHandler.js');

const verifyJWT = asyncHandler(async (req, _, next) => {
    const { accessToken } = req.cookies;

    if (!accessToken) {
        throw new ApiError(401, "No Access Token found");
    }

    try {
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        if (!decodedToken) {
            throw new ApiError(401, "Invalid Access Token");
        }

        const user = await User.findById(decodedToken._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new ApiError(401, "Access Token expired");
        }
        throw new ApiError(401, "Invalid Access Token");
    }
})

module.exports = { verifyJWT };
