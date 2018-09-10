const express = require('express');
const router = express.Router();
const posts = require('./posts')

router.use('/posts', posts);
router.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});
router.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

module.exports = router;
