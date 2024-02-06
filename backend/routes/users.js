const express = require('express');
const router = express.Router();

// imported modules
const authController = require('../controller/authController');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/register', authController.signin_post);

router.post("/login", authController.login_post);

router.get('/logout', authController.logout_get);


module.exports = router;
