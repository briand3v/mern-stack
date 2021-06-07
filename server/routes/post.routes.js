const express = require('express');
const router = express.Router();
const upload = require("../utils/multer");
const PostController = require('../controllers/post.controller');
const authenticateMiddleware = require('../middleware/authenticate.middleware');

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(PostController.getPost);

// upload image to post by pos id
router.route('/posts/:cuid').post(authenticateMiddleware.ensureAuthenticated, upload.array("file"), PostController.uploadImagePost);

// Add a new Post
router.route('/posts')
    .post(authenticateMiddleware.ensureAuthenticated, PostController.addPost);

// Delete a post by cuid
router.route('/posts/:cuid')
    .delete(authenticateMiddleware.ensureAuthenticated, PostController.deletePost);


module.exports = router;
