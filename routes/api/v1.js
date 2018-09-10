const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../../models/Post');

var posts = [{
  title: 'First Post',
  body: 'Here\'s the contents of the first post.',
  slug: '/firstpost'
},
{
  title: 'Second Post',
  body: 'Here\'s the contents of the second post.',
  slug: '/secondpost'
}]

router.route('/')
    .get(getRouteHandler)
    .post(postRouteHandler);

function getRouteHandler(req, res) {
    //handle GET route here
    res.json(posts);
}

function postRouteHandler(req, res) {
    //handle POST route here
}



// Get all posts
router.get('/blog/posts', (req, res, next) => {
  Post.find()
    .select('_id title body')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        posts: docs
      };
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({error: err});
    });
});

// Get a post by id
router.get('/blog/posts/:postId', (req, res, next) => {
  const id = req.params.postId;
  Post.findById(id)
    .exec()
    .then(doc => {
      if(doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({message: 'Not found'});
      }
    })
    .catch(err => {
      res.status(500).json({error: err});
    });
});

// Add a new post
router.post('/blog/posts', (req, res, next) => {
  const post = new Post({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    body: req.body.body
  });
  post
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Posted successfully',
        createdPost: post
      })
    })
    .catch(err => {
      res.status(500).json({error: err});
    });
});

// Delete a post by id
router.delete('/blog/posts/:postId', (req, res, next) => {
  const id = req.params.postId;
  Post.remove({_id: id})
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({error: err});
    });
});

// Patch (update) a post by id
router.patch('/blog/posts/:postId', (req, res, next) => {
  const id = req.params.postId;
  const updateOps = {};
  for(const ops of req.body){
    updateOps[ops.propName] = ops.value;
  }
  Post.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({error: err});
    });
});

module.exports = router;
