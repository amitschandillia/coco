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
    .exec()
    .then(docs => {
      res.status(200).json(docs);
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

// Add a new blog post
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






module.exports = router;
