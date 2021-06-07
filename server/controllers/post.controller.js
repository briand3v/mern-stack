const Post = require('../models/post');
const cuid = require('cuid');
const slug = require('limax');
const sanitizeHtml = require('sanitize-html');
const cloudinary = require("../utils/cloudinary");
const uploadImagesPostService = require('../services/post/post.service').uploadImagesPost;

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
getPosts = async (req, res) => {
  Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ posts });
  });
};

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
addPost = async (req, res) => {
  if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
    res.status(403).end();
  }

  const newPost = new Post(req.body.post);

  // Let's sanitize inputs
  newPost.title = sanitizeHtml(newPost.title);
  newPost.name = sanitizeHtml(newPost.name);
  newPost.content = sanitizeHtml(newPost.content);

  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();
  newPost.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ post: saved });
  });
};

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
getPost = async (req, res) => {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ post });
  });
};

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
deletePost = async (req, res) => {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      return res.status(500).send(err);
    }
    
    if (post.name !== req.user.username) {
      return res.status(400).json({ message: 'You are not the owner of this post' });
    }

    if (post.images.length > 0) {
      const publicIds = post.images.map(image => image.publicId);
      cloudinary.api.delete_resources(publicIds, (error, result) => {
        console.log(result);
      });
    }

    post.remove(() => {
      res.status(200).json({ message: 'Post deleted' });
    });
  });
};

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
uploadImagePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ cuid: req.params.cuid });
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.name !== req.user.username) {
      return res.status(400).json({ message: 'You are not the owner of this post' });
    }

    const imagesUploaded = await uploadImagesPostService(post, req.files);
    if (!imagesUploaded) return res.status(400).json({ message: 'Image could upload' });

    res.status(200).json({ post: imagesUploaded });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPosts,
  addPost,
  getPost,
  deletePost,
  uploadImagePost
};
