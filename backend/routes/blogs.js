const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');
const { requireAuth } = require('../middleware/auth.middleware');
const {upload} = require("../middleware/multer.middleware");


router.post('/createPost', upload.single("thumbnail") ,postController.createBlog_Post);

module.exports = router;
