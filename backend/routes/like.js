const { Router } = require("express");
const { toggleLike, allLikedPosts } = require("../controller/likeController");
const { verifyJWT } = require('../middleware/auth.middleware');


const router = Router();

router.use(verifyJWT)

router.post('/:postId', toggleLike);

router.get('/posts', allLikedPosts);

module.exports = router;