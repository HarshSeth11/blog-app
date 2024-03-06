const { Router } = require("express");
const { toggleLike, allLikedPosts } = require("../controller/likeController");

const router = Router();

router.post('/:postId', toggleLike);

router.get('/posts', allLikedPosts);

module.exports = router;