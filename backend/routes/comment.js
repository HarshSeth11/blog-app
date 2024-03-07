const { Router } = require("express");
const { verifyJWT } = require('../middleware/auth.middleware');
const { addComment, editComment, deleteComment, getPostComments } = require("../controller/commentController");


const router = Router();

router.use(verifyJWT)

router.get('/:postId', getPostComments);

router.post('/create/:postId', addComment);

router.patch("/edit/:postId/:commentId", editComment);

router.delete('/delete-comment/:commentId', deleteComment);

module.exports = router;