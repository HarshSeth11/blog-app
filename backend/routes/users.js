const { Router } = require('express');
const verifyJWT = require('../middleware/auth.middleware')
const router = Router();

// imported modules
const {registerUser, loginUser, logoutUser, refreshAccessToken, changePassword, getCurrentUser, updateAccountDetails} = require('../controller/authController');


router.post('/register', registerUser);


router.post('/login', loginUser);

router.post('/logout', verifyJWT, logoutUser);

router.post('/refresh-token', refreshAccessToken);

router.post('/change-password', verifyJWT, changePassword);

router.get('/current-user', verifyJWT, getCurrentUser);

router.patch('/update-account', verifyJWT, updateAccountDetails);



module.exports = router;
