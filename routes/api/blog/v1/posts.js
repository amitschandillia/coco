const express = require('express');

const router = express.Router();

const Controller = require('./controllers/PostController');

router.route('/')
  .get(Controller.getAllPostsHandler)
  .post(Controller.addNewPostHandler);

router.route('/:postId')
  .get(Controller.getPostByIdHandler)
  .delete(Controller.deletePostHandler)
  .patch(Controller.updatePostHandler);

module.exports = router;
