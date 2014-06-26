var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
  // 'loading': path.join(__dirname, '../web/public/loading.html')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(){

};

exports.isUrlInList = function(targetUrl, callback){
  fs.readFile(exports.paths.list, function (err, data) {
    if (err){
      throw err;
    }
    data = data.toString().split('\n');
    console.log("DATA:", data, "TARGET URL:", targetUrl);
    if (_.contains(data, targetUrl)) {
      exports.isURLArchived(targetUrl, callback);
    } else {
      exports.addUrlToList(targetUrl, callback);
    }
  });

  /*if(url === targetUrl){
    if(isURLArchived(targetUrl)){
      serve
    }
  }*/
};

exports.addUrlToList = function(url, callback){
  url += "\n";
  fs.appendFile(exports.paths.list, url, function (err) {
    if (err) {
      throw err;
    } else {
      callback(path.join(exports.paths.siteAssets, 'loading.html'));
    }
  });
};

exports.isURLArchived = function(targetUrl, callback){
  console.log("path to isURLArchived works");
  // if data sent it callback(data)
  fs.readFile(path.join(exports.paths.archivedSites, targetUrl), function (err, data) {
    if (err) {
      callback(path.join(exports.paths.siteAssets, 'loading.html'));
    } else {
      callback(path.join(exports.paths.archivedSites, targetUrl));
    }
  });
};

exports.downloadUrls = function(){
};
