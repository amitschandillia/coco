const express = require('express');
const router = express.Router();
const getAllPostsHandler = require('../../../../../controllers/PostController').getAllPostsHandler;
const addNewPostHandler = require('../../../../../controllers/PostController').addNewPostHandler;
const getPostByIdHandler = require('../../../../../controllers/PostController').getPostByIdHandler;
const DeletePostHandler = require('../../../../../controllers/PostController').DeletePostHandler;
const updatePostHandler = require('../../../../../controllers/PostController').updatePostHandler;

router.route('/')
    .get(getAllPostsHandler)
    .post(addNewPostHandler);

router.route('/:postId')
    .get(getPostByIdHandler)
    .delete(DeletePostHandler)
    .patch(updatePostHandler);

module.exports = router;
