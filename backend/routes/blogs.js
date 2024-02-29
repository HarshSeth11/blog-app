const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');
const { verifyJWT } = require('../middleware/auth.middleware');
const {upload} = require("../middleware/multer.middleware");

router.use(verifyJWT);

router.post('/create-post', upload.single("thumbnail") ,postController.createBlog_Post);

router.get('/all-posts', postController.getAllPosts);

router.patch('/update-post/:postId', postController.updatePostDetails);

router.patch('/change-thumbnail/:postId', upload.single("thumbnail"), postController.changeThumbnail);

router.delete('/delete-post/:postId', postController.deletePost);

module.exports = router;
