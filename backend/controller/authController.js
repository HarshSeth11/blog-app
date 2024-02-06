const User = require('../models/user.modal.js');
const jwt = require('jsonwebtoken');

// Functions 
const maxAge = 3 * 24 * 60 * 60;
const createToken = async(id) => {
    try {
        return jwt.sign({ id }, 'heythisismysecretkey', { expiresIn : maxAge });
    } catch (error) {
        return error;
    }
}

module.exports.signin_post = async (req,res,next) => {
    console.log(req.body);
    try {
        const user = new User({
        name: req.body.name,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        })
        const createdUser = await user.save();
        const token = await createToken(createdUser._id);
        res.cookie('auth_token', token, {httpOnly: true, expires : new Date(Date.now() + 25892000000)})
        .status(201)
        .json({createdUser, success: true});
    } catch (error) {
        res.json({error : error.message, obj : error.keyValue, success: false})
    }
}

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