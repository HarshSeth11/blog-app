const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');


/* GET home page. */
router.get('/', requireAuth ,function(req, res, next) {
  console.log(req.headers.cookie)

  console.log("called");
  res.end();
});

module.exports = router;
