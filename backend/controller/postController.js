const blogPosts = require('../models/posts');

module.exports.createBlog_Post = (async(req,res,next) => {
    try {
        console.log(req.body);
        const blogPost = new blogPosts({
            title: req.body.title,
            author: "req.body.author",
            body: req.body.body
        })
    
        const post = await blogPost.save();
        console.log(post);
        res.json({success : true});
    } catch (error) {
        console.log("error");
        next(error);
    }
});

