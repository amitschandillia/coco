const express = require('express');
const router = express.Router();

const Controller = require('../../../../../controllers/PostController');
const getAllPostsHandler = Controller.getAllPostsHandler;
const addNewPostHandler = Controller.addNewPostHandler;
const getPostByIdHandler = Controller.getPostByIdHandler;
const DeletePostHandler = Controller.DeletePostHandler;
const updatePostHandler = Controller.updatePostHandler;

router.route('/')
    .get(getAllPostsHandler)
    .post(addNewPostHandler);

router.route('/:postId')
    .get(getPostByIdHandler)
    .delete(DeletePostHandler)
    .patch(updatePostHandler);

module.exports = router;
