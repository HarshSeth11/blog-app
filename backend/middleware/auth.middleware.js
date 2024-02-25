const jwt = require('jsonwebtoken');

const verifyJWT = (req,res,next) => {
    const token = req.cookies.auth_token;

    if(token) {
        jwt.verify(token, 'heythisismysecretkey', (err, decodedtoken) => {
            if(err) {
                console.log(err);
                res
                .json({ auth : false });
            }
            else{
                console.log(decodedtoken);
                res.json({ auth : true });
                next();
            }
        })
    }
    else {
        console.log("Not Authorized");
        res.json({ auth : false });
    }
}

module.exports = { verifyJWT };