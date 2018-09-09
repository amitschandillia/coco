const fs = require('fs');
const path = require('path');
require('dotenv').config();
const crypto = require('crypto');

// get hash seed
const ep = String((new Date()).getTime());

// create hash
const logohash = crypto.createHash('md5').update(ep + process.env.NAVBAR_LOGO).digest('hex');
const csshash = crypto.createHash('md5').update(ep + process.env.CSS).digest('hex');

// rename logo file
// fs.rename(`./static/img/${process.env.NAVBAR_LOGO}.svg`, `./static/img/${logohash}.svg`, (err) => {
  // eslint-disable-next-line no-console
  // if (err) console.log(`ERROR: ${err}`);
// });

// update .env
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
var cachedItems = ['/'];
function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}

walkSync('./pages/', function(filePath, stat) {
  cachedItem = filePath.substr(5);
  if(cachedItem.indexOf('_') == -1) {
    cachedItems.push(cachedItem.substr(0, cachedItem.length-3));
  }
});
walkSync('./static/images', function(filePath, stat) {
  cachedItem = '/_f' + filePath.substr(6);
  if(cachedItem.indexOf('favicon.ico') != -1) cachedItem = '/favicon.ico';
  cachedItems.push(cachedItem);
});
cachedItems.push('/_f/scripts/materialize.min.js', '/_f/manifest.json');
cachedItems.push(`/_s/${csshash}.min.css`);


// prepare URLSTOCACHE
var urls2cache = '';
for(var i in cachedItems){
  urls2cache += '\t"' + cachedItems[i] + '",\n';
}
urls2cache = urls2cache.substr(0, urls2cache.length-2);
urls2cache = 'const URLSTOCACHE = [\n' + urls2cache + '\n]';

// read serviceWorker.js
var sw = fs.readFileSync('./offline/serviceWorker.js', 'utf8');

// retrieve and prepare CACHE_NAME (version string)
var swarray = sw.split(';');
for(line in swarray) {
  if(swarray[line].indexOf('const CACHE_NAME') != -1) var cachenameindex = line;
  if(swarray[line].indexOf('const URLSTOCACHE') != -1) var urlstocacheindex = line;
}
swarray[urlstocacheindex] = urls2cache;
var versionarray = swarray[cachenameindex].split('.');
versionstring = versionarray[0];
versionval = versionarray[1].substr(0, versionarray[1].length - 1);
versionval = parseInt(versionval) + 1;
swarray[cachenameindex] = versionstring + '.' + versionval + '"';

for(item in swarray) {
  swarray[item] = swarray[item].trim();
}


sw = swarray.join(';\n');

fs.writeFile(
  './offline/serviceWorker.js',
  sw,
  'utf8', (err) => {
    if (err) throw err;
  }
);
