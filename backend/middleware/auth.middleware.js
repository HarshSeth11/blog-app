const jwt = require('jsonwebtoken');
const { ApiError } = require('../utils/ApiError');
const User = require('../models/user.modal.js');

const verifyJWT = async (req,res,next) => {
    const { accessToken } = req.cookies;

    if(accessToken) {
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        if(!decodedToken) {
            throw new ApiError(404, "user not found!");
        }

        const user = await User.findById(decodedToken._id);

        if(!user) {
            throw new ApiError(404, "user not found!");
        }

        req.user = user;
        next();
    }
    else {
        throw new ApiError(404, "No Access Token found!!");
    }
}

module.exports = { verifyJWT };