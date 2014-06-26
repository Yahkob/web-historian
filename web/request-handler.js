var path = require('path');
var helpers = require('./http-helpers')
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var sitePath = archive.paths.siteAssets + req.url;
  if(req.method === "GET"){
    if(req.url === "/"){
      console.log(sitePath)
      helpers.serveAssets(res, sitePath + 'index.html');
    }
    else{
      helpers.serveAssets(res, sitePath);

    }
  }
};