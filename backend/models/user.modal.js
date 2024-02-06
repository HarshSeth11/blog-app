const mongoose = require('mongoose');
const { Schema } = mongoose;
const { isEmail } = require('validator');
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please Enter the name"],
    },
    userName: {
        type: String,
        required: [true, "Please Enter the username"],
        unique: [true, "user name Already exists"],
    },
    email: {
        type: String,
        required: [true, "Please Enter the email"],
        unique: [true, "Email Already exists"],
        lowercase: true,
        validate : [isEmail, "Please Enter the valid Email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter the password"],
        minlength : [8, "Minimum password length is 8 characters"]
    }
});


userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function() {
    jsonwebtoken.sign({
        _id: this._id,
        userName: this.userName,
        email: this.email,
        name: this.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
    )
}

userSchema.methods.generateRefreshToken = function() {
    jsonwebtoken.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: REFRESH_TOKEN_EXPIRY,
        }
    )
}

module.exports =  mongoose.model('User', userSchema);