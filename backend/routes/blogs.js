const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');
const { requireAuth } = require('../middleware/authMiddleware');


router.post('/createPost', postController.createBlog_Post);

module.exports = router;
