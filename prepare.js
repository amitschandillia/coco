const fs = require('fs');
const path = require('path');
require('dotenv').config();
const crypto = require('crypto');
const editJsonFile = require('edit-json-file');

// get hash seed
const seed = String((new Date()).getTime());

// create hash
const logohash = crypto.createHash('md5').update(seed + process.env.NAVBAR_LOGO).digest('hex');
const csshash = crypto.createHash('md5').update(seed + process.env.CSS).digest('hex');

// rename logo file
// fs.rename(
//   `./static/img/${process.env.NAVBAR_LOGO}.svg`,
//   `./static/img/${logohash}.svg`,
//   (err) => {
//   eslint-disable-next-line no-console
//   if (err) console.log(`ERROR: ${err}`);
// });

// Update .env
fs.readFile('./.env', 'utf8', (err, data) => {
  if (err) throw err;
  // update new env value for logo
  let result = data.replace(`${process.env.NAVBAR_LOGO}`, `${logohash}`);
  // update new env value for css
  result = result.replace(`${process.env.CSS}`, `${csshash}`);
  // write updated data to .env
  fs.writeFile('./.env', result, 'utf8', (error) => {
    if (error) throw err;
  });
});

// List out files
// var walk = function(dir, done) {
//     var results = [];
//     fs.readdir(dir, function(err, list) {
//         if (err) return done(err);
//         var i = 0;
//         (function next() {
//             var file = list[i++];
//             if (!file) return done(null, results);
//             //file = dir + '/' + file;
//             file = path.resolve(dir, file);
//             fs.stat(file, function(err, stat) {
//                 if (stat && stat.isDirectory()) {
//                     walk(file, function(err, res) {
//                         results = results.concat(res);
//                         next();
//                     });
//                 }
//                 else {
//                     file = file.replace('./static/images/icons', '');
//                     results.push(file);
//                     next();
//                 }
//             });
//         })();
//     });
// };
// var mydir = path.resolve('./static/images/icons');
// walk(mydir, function(err, results) {
//     if (err) throw err;
//     console.log(util.inspect(results, { maxArrayLength: null }));
// });

// PREPARE CACHE FILES AND SERVICE WORKER
// -----------------------------------------------------------------------------
const cachedItems = ['/'];
function walkSync(currentDirPath, callback) {
  fs.readdirSync(currentDirPath).forEach((name) => {
    const filePath = path.join(currentDirPath, name);
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      callback(filePath, stat);
    } else if (stat.isDirectory()) {
      walkSync(filePath, callback);
    }
  });
}
// Cache pages
walkSync('./pages/', (filePath) => {
  const cachedItem = filePath.substr(5);
  if (cachedItem.indexOf('_') === -1) {
    cachedItems.push(cachedItem.substr(0, cachedItem.length - 3));
  }
});
// Cache images and favicon
walkSync('./static/images', (filePath) => {
  let cachedItem = `/_f${filePath.substr(6)}`;
  if (cachedItem.indexOf('favicon.ico') !== -1) cachedItem = '/favicon.ico';
  cachedItems.push(cachedItem);
});
// Cache style assets and manifest
cachedItems.push('/_f/scripts/materialize.min.js', '/_f/manifest.json');
cachedItems.push(`/_s/${csshash}.min.css`);
// -----------------------------------------------------------------------------

// prepare URLSTOCACHE
let urls2cache = '';
for (let i = 0; i < cachedItems.length; i += 1) {
  urls2cache += `  '${cachedItems[i]}',\n`;
}
urls2cache = urls2cache.substr(0, urls2cache.length - 2);
urls2cache = `const URLSTOCACHE = [\n${urls2cache},\n]`;

// read serviceWorker.js
let sw = fs.readFileSync('./offline/serviceWorker.js', 'utf8');

// retrieve and prepare CACHE_NAME (version string)
const swarray = sw.split(';');
let cachenameindex = '';
let urlstocacheindex = '';
for (let i = 0; i < swarray.length; i += 1) {
  if (swarray[i].indexOf('const CACHE_NAME') !== -1) cachenameindex = i;
  if (swarray[i].indexOf('const URLSTOCACHE') !== -1) urlstocacheindex = i;
}
swarray[urlstocacheindex] = urls2cache;
const versionarray = swarray[cachenameindex].split('.');
const versionstring = versionarray[0];
let versionval = versionarray[1].substr(0, versionarray[1].length - 1);
versionval = parseInt(versionval, 10) + 1;
swarray[cachenameindex] = `${versionstring}.${versionval}'`;

for (let i = 0; i < swarray.length; i += 1) {
  swarray[i] = swarray[i].trim();
}

sw = swarray.join(';\n');

fs.writeFile(
  './offline/serviceWorker.js',
  sw,
  'utf8', (err) => {
    if (err) throw err;
  },
);

// prepare manifest.json
const file = editJsonFile(`${__dirname}/static/manifest.json`);
file.set('name', `${process.env.NAME}`);
file.set('short_name', `${process.env.SHORT_NAME}`);
file.set('theme_color', `${process.env.THEME_COLOR}`);
file.set('background_color', `${process.env.BACKGROUND_COLOR}`);
file.save();
