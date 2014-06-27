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

exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, function(err, data){
    if(err){
      throw err;
    }
    else{
      callback(data.toString().split('\n'));
    }
  });
};

exports.isUrlInList = function(targetUrl, callback){
  exports.readListOfUrls(function (data) {
    console.log(targetUrl, data);
    if (_.contains(data, targetUrl)) {
      exports.isURLArchived(targetUrl, callback);
    } else {
      exports.addUrlToList(targetUrl, callback);
    }
  });
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

exports.downloadUrls = function(http){
  exports.readListOfUrls(function (urls) {
    for (var i = 0; i < urls.length; i++) {
      console.log("connection to url", urls[i]);
      var url = "http://"+urls[i];
      console.log("URL", url);
      http.get(url, function(res) {
        var that = this;
        var data = '';
        res.on('data', function (chunk) {
          data += chunk;
        });
        res.on('end', function () {
          saveFile(data, that.toString());
        })
      }.bind(urls[i])).on('error', function (err) {
        console.log('Error Message', err.message);
      });
    }
  });
};

var saveFile = function (htmlData, fileName) {
  fs.writeFile(path.join(exports.paths.archivedSites, fileName), htmlData,function(err){
    if(err){
      throw err;
    }
    console.log("CREATING FILE");
  });
};

