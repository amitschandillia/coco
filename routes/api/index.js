const express = require('express');

const router = express.Router();
const blog = require('./blog');

// Configure CORS options
// ---------------------------------------------------------------------
router.use((req, res, next) => { // eslint-disable-line no-shadow
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
  return false;
});
// ---------------------------------------------------------------------

router.use('/blog', blog);
router.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});
router.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
  next();
});

module.exports = router;
