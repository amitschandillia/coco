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



router.get('/blog/posts', (req, res, next) => {
  res.status(200).json({
    message: "Testing get requests!"
  });
});


router.post('/blog/posts', (req, res, next) => {
  const post = new Post({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    body: req.body.body
  });
  post.save()
    .then(result => console.log(result))
    .catch(err => console.log(err));
  res.status(201).json({
    message: "Testing post requests!",
    createdPost: post
  });
});






module.exports = router;
