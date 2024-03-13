const { Router } = require("express");
const { verifyJWT } = require('../middleware/auth.middleware');
const { addComment, editComment, deleteComment, getPostComments } = require("../controller/commentController");


const router = Router();

router.use(verifyJWT)

router.post('/add/:postId', addComment);

router.get('/:postId', getPostComments);

router.patch("/edit/:postId/:commentId", editComment);

router.delete('/delete-comment/:commentId', deleteComment);

module.exports = router;