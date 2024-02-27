const User = require('../models/user.modal.js');
const jwt = require('jsonwebtoken');
const {asyncHandler} = require("../utils/asyncHandler.js");
const {ApiError} = require("../utils/ApiError.js");
const {ApiResponse} = require("../utils/ApiResponse.js");

const generateAccessAndRefreshToken = async(id) => {
    try {
        const user = await User.findById(id);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return {accessToken, refreshToken};

    } catch (error) {
        throw new ApiError(500, "Error while generating tokens");
    }
}

function validateEmail(email) {
    const pattern = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
}

module.exports.registerUser = asyncHandler( async (req, res, next) => {
    // destructure the data from the req body
    // validate the data
    // check if user already exist.
    // if everything is alright create the user
    // send the user data in response

    const {name, userName, email, password} = req.body;

    if( [name, userName, email, password].some((item) => (item === null || item === undefined || item.trim() === ""))) {
        throw new ApiError(400, "All Fields are required.");
    }

    if(!validateEmail(email)) {
        throw new ApiError(400, "Invalid Email Address");
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

module.exports.loginUser = asyncHandler( async (req, res) => {
    const { username, email, password } = req.body;


    if (!username && !email) {
        throw new ApiError(400, "Username or email is required");
    }

    if(!validateEmail(email)) {
        throw new ApiError(400, "Invalid Email Address");
    }

    if(req.cookies.accessToken) {
        const decodedToken = jwt.verify(req.cookies.accessToken, process.env.ACCESS_TOKEN_SECRET);

        if(!decodedToken) {
            throw new ApiError(404, "Token not not found!");
        }

        const user = await User.findById(decodedToken._id);

        if(user) {
            throw new ApiError(400, "You're already logged in");
        }
    }

    const user = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (!user) throw new ApiError(400, "User doesn't exist");

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Password is incorrect!!");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        user._id
    );

    const loginUser = await User.findById(user._id).select(
        " -password -refreshToken "
    );

    
    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, "User Successfully Logged in", {
            loginUser,
            refreshToken,
            accessToken,
        })
    );
})

module.exports.logoutUser = asyncHandler(async (req,res) => {
    await User.findByIdAndUpdate(
        req?.user?._id,
        {
            $unset: {
                refreshToken: 1,
            },
        }
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "User Successfully Logged out!", {}));

});

module.exports.refreshAccessToken = asyncHandler(async (req, res) => {
    const cookieRefreshToken = req.cookies?.refreshToken;

    if (!cookieRefreshToken) {
        throw new ApiError(401, "Refresh Token required");
    }

    try {
        const decodedToken = jwt.verify(cookieRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decodedToken._id);

        if (!user) {
            throw new ApiError(400, "User doesn't exist");
        }

        const { refreshToken, accessToken } = await generateAccessAndRefreshToken(user._id);

        const options = {
            httpOnly: true,
            secure: true
        }

        res.cookie("refreshToken", refreshToken, options);
        res.cookie("accessToken", accessToken, options);
        res.status(200).json(new ApiResponse(200, "Both tokens are generated successfully", { refreshToken, accessToken }));
    } catch (error) {
        // Handle any errors here
        if (error.name === 'TokenExpiredError') {
            throw new ApiError(401, "Refresh Token expired");
        }
        throw new ApiError(401, "Invalid Refresh Token");
    }
});


module.exports.changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect)
        throw new ApiError(400, "Old Password is incorrect");

    user.password = newPassword;

    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, "Password Changed Successfully", {}));
});

module.exports.getCurrentUser = asyncHandler( async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, "User Fetched Successfully", req.user));
});

module.exports.updateAccountDetails = asyncHandler( async (req, res) => {
    const { userName, name, email } = req.body;

    updatableObjects = {};

    if(userName.time() !== "") {
        updatableObjects["userName"] = userName;
    }
    if(name.time() !== "") {
        updatableObjects["name"] = name;
    }
    if(email.time() !== "") {
        updatableObjects["email"] = email;
    }

    const user = await User.findByIdAndUpdate(req.user._id, updatableObjects, {new: true});

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                "Information is updated Successfully",
                user
            )
        );
});