const subdomain = require('express-subdomain');
const express = require('express')
require('dotenv').config()
const path = require('path')
const { createReadStream } = require('fs')
const next = require('next')
const compression = require('compression')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const RedisStore = require('connect-redis')(expressSession);
const passport = require('passport');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const APIRoutes = require('./routes/api');
const AdminRoutes = require('./routes/admin');
// const config = require('./config/main');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()
    const api_router = express.Router();
    const admin_router = express.Router();

    mongoose.connect(process.env.MONGO_PATH_ATLAS_34, {useNewUrlParser: true});

    server.use(compression())
    server.use(favicon(path.join(__dirname, 'static', 'images', 'icons', 'favicon.ico')))
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(cookieParser());
    server.use(helmet());

    // Configure CORS options
    // ---------------------------------------------------------------------
    // var corsOptions = {
    //   'origin': '*',
    //   'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    //   'allowedHeaders': ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    //   'preflightContinue': true,
    //   'optionsSuccessStatus': 200
    // };
    // server.use(cors());
    server.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      );
      if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
      }
      next();
    });
    // ---------------------------------------------------------------------

    // Subdomain routing
    // ---------------------------------------------------------------------
    server.use(subdomain('api', APIRoutes));
    server.use(subdomain('admin', AdminRoutes));
    // ---------------------------------------------------------------------

    // Custom build resources aliases
    // ---------------------------------------------------------------------
    server.get('/sw.js', (req, res) => {
      res.set({'Content-Type': 'text/javascript'});
      createReadStream('./offline/serviceWorker.js').pipe(res);
    });
    server.use('/_s', express.static(path.join(__dirname, '.build', 'static')));
    server.use('/_f', express.static(path.join(__dirname, 'static')));
    server.use('/favicon.ico', express.static(path.join(__dirname, 'static', 'images', 'icons', 'favicon.ico')));
    server.use('/_next/webpack/static', express.static(path.join(__dirname, '.build', 'static')));
    // ---------------------------------------------------------------------

    // Custom/dynamic routes
    // ---------------------------------------------------------------------
    // server.get('/a', (req, res) => {
    //   return app.render(req, res, '/b', req.query)
    // })
    // server.get('/b', (req, res) => {
    //   return app.render(req, res, '/a', req.query)
    // })
    // server.get('/posts/:id', (req, res) => {
    //   return app.render(req, res, '/posts', { id: req.params.id })
    // })
    // ---------------------------------------------------------------------


    // Default route (not to be edited)
    // ---------------------------------------------------------------------
    server.get('*', (req, res) => {
      return handle(req, res)
    })
    // ---------------------------------------------------------------------

    server.listen(process.env.PORT, (err) => {
      if (err) throw err
      console.log(`> Listening on port ${process.env.PORT}...`); // eslint-disable-line no-console
    })
  })
  .catch((ex) => {
    console.error(ex.stack); // eslint-disable-line no-console
    process.exit(1);
  });
