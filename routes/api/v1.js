const express = require('express');
const router = express.Router();
require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('../../models/Post');

const apiurl = `https://api.${process.env.BRAND_DOMAIN}/v1/blog/posts/`;
const fields = '_id title body';

router.route('/blog/posts')
    .get(getAllPostsHandler)
    .post(addNewPostHandler);

router.route('/blog/posts/:postId')
    .get(getPostByIdHandler)
    .delete(DeletePostHandler)
    .patch(updatePostHandler);


function getAllPostsHandler(req, res, next) {
  Post.find()
    .select(fields)
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        posts: docs.map(doc => {
          return {
            _id: doc._id,
            title: doc.title,
            body: doc.body,
            request: {
              type: 'GET',
              description: 'Get this post',
              url: `${apiurl}${doc._id}`
            }
          }
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({error: err});
    });
}

function addNewPostHandler(req, res, next) {
  const post = new Post({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    body: req.body.body
  });
  post
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Post added successfully',
        createdPost: {
          _id: result._id,
          title: result.title,
          body: result.body,
          request: {
            type: 'GET',
            description: 'Get this post',
            url: `${apiurl}${result._id}`
          }
        }
      })
    })
    .catch(err => {
      res.status(500).json({error: err});
    });
}

function getPostByIdHandler(req, res, next) {
  const id = req.params.postId;
  Post.findById(id)
    .select(fields)
    .exec()
    .then(doc => {
      if(doc) {
        res.status(200).json({
          post: {
            _id: doc._id,
            title: doc.title,
            body: doc.body,
            request: {
              type: 'GET',
              description: 'Get all posts',
              url: apiurl
            }
          }
        });
      } else {
        res.status(404).json({message: 'Not found'});
      }
    })
    .catch(err => {
      res.status(500).json({error: err});
    });
}

function DeletePostHandler(req, res, next) {
  const id = req.params.postId;
  Post.deleteOne({_id: id})
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Post deleted successfully!',
        request: {
          type: 'GET',
          description: 'Get all posts',
          url: apiurl
        }
      });
    })
    .catch(err => {
      res.status(500).json({error: err});
    });
}

function updatePostHandler(req, res, next) {
  const id = req.params.postId;
  const updateOps = {};
  for(const ops of req.body){
    updateOps[ops.propName] = ops.value;
  }
  Post.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Post updated successfully',
        request: {
          type: 'GET',
          description: 'Get this post',
          url: apiurl + id
        }
      });
    })
    .catch(err => {
      res.status(500).json({error: err});
    });
}

module.exports = router;
