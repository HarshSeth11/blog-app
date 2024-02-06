const mongoose = require('mongoose');
const { Schema } = mongoose;
const { isEmail } = require('validator');
const bcrypt = require("bcrypt");

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


userSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.statics.login = async function(email,password) {
    const user = await this.findOne({ email });
    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user;
        }
        else {
            throw Error('Incorrect-password');
        }
    }
    else{
        throw Error('Incorrect-Email');
    }
}

module.exports =  mongoose.model('User', userSchema);