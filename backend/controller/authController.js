const User = require('../models/user.modal.js');
const jwt = require('jsonwebtoken');
const {asyncHandler} = require("../utils/asyncHandler.js");
const {ApiError} = require("../utils/ApiError.js");
const {ApiResponse} = require("../utils/ApiResponse.js");

module.exports.signin_post = asyncHandler( async (req, res, next) => {
    // destructure the data from the req body
    // validate the data
    // check if user already exist.
    // if everything is alright create the user
    // send the user data in response

    const {name, userName, email, password} = req.body;

    if( [name, userName, email, password].some((item) => (item === null || item === undefined || item.trim() === ""))) {
        throw new ApiError(400, "All Fields are required.");
    }

    const userAlreadyExist = await User.findOne({
        $or: [{userName},{email}]
    });

    if(userAlreadyExist) throw new ApiError(409, "User Already Exists.");

    const user = await User.create({name, userName, email, password});

    const createdUser = await User.findById(user._id).select(" -password ");

    res.status(201).json(
        new ApiResponse(200, "User is created", createdUser)
    );
})

module.exports.login_post = async (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    
    try {
        const user = await User.login(email,password); 
        console.log(user);
        const token = await createToken(user._id);
        res
        .cookie('auth_token', token, {httpOnly: true, expires : new Date(Date.now() + 25892000000)})
        .json({success: true});
    } catch(err) {
        console.log(err);
        res.status(400).json({msg : err});
    }
}

module.exports.logout_get = (req,res) => {
    res.cookie('auth_token', '', { maxAge: 1 })
    .json({ok : true})
}