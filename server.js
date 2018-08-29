const express = require('express')
require('dotenv').config()
const path = require('path')
const next = require('next')
const compression = require('compression')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const RedisStore = require('connect-redis')(expressSession);
const passport = require('passport');
const favicon = require('serve-favicon');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()

    server.use(compression())
    server.use(favicon(path.join(__dirname, 'static', 'img', 'favicon.ico')))
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(cookieParser());

    server.get('/a', (req, res) => {
      return app.render(req, res, '/b', req.query)
    })

    server.get('/b', (req, res) => {
      return app.render(req, res, '/a', req.query)
    })

    server.get('/posts/:id', (req, res) => {
      return app.render(req, res, '/posts', { id: req.params.id })
    })

    // Custom build resources aliases
    // ---------------------------------------------------------------
    server.use('/_s', express.static(path.join(__dirname, '.build/static')));
    server.use('/_f', express.static(path.join(__dirname, './static/img')));
    server.use('/_next/webpack/static', express.static(path.join(__dirname, '.build/static')));
    // ---------------------------------------------------------------

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(process.env.PORT, (err) => {
      if (err) throw err
      console.log(`> Listening on port ${process.env.PORT}...`); // eslint-disable-line no-console
    })
  })
  .catch((ex) => {
    console.error(ex.stack); // eslint-disable-line no-console
    process.exit(1);
  });