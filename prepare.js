const fs = require('fs');
const path = require('path');
require('dotenv').config();
const crypto = require('crypto');
const editJsonFile = require('edit-json-file');

// get hash seed
const seed = String((new Date()).getTime());

// create hash
const logohash = crypto
  .createHash('md5')
  .update(seed + process.env.NAVBAR_LOGO)
  .digest('hex');
const csshash = crypto
  .createHash('md5')
  .update(seed + process.env.CSS)
  .digest('hex');
const swcachehash = crypto
  .createHash('md5')
  .update(seed + process.env.SW_CACHE_VERSION)
  .digest('hex');

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
  // update new env value for service worker cache
  result = result.replace(`${process.env.SW_CACHE_VERSION}`, `${swcachehash}`);
  // write updated data to .env
  fs.writeFile('./.env', result, 'utf8', (error) => {
    if (error) throw err;
  });
});

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
let urlsToCache = '';
for (let i = 0; i < cachedItems.length; i += 1) {
  urlsToCache += `  '${cachedItems[i]}',\n`;
}
urlsToCache = urlsToCache.substr(0, urlsToCache.length - 2);
urlsToCache = `const URLS_TO_CACHE = [\n${urlsToCache},\n]`;

// prepare CACHE_NAME
const cacheName = `const CACHE_NAME = '${swcachehash}'`;

// read serviceWorker.js
let sw = fs.readFileSync('./offline/serviceWorker.js', 'utf8');

// update CACHE_NAME and URLSTOCACHE
const swarray = sw.split(';');
swarray[0] = cacheName;
swarray[1] = urlsToCache;

// tidy up the array and merge it into a string
for (let i = 0; i < swarray.length; i += 1) {
  swarray[i] = swarray[i].trim();
}
sw = swarray.join(';\n');

// save updated contents to offline/serviceWorker.js
fs.writeFile(
  './offline/serviceWorker.js',
  sw,
  'utf8', (err) => {
    if (err) throw err;
  },
);

// prepare manifest.json
const file = editJsonFile(`${__dirname}/static/manifest.json`);
file.set('name', `${process.env.MANIFEST_NAME}`);
file.set('short_name', `${process.env.MANIFEST_SHORT_NAME}`);
file.set('theme_color', `${process.env.MANIFEST_THEME_COLOR}`);
file.set('background_color', `${process.env.MANIFEST_BACKGROUND_COLOR}`);
file.save();
