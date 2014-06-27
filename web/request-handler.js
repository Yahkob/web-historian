var path = require('path');
var helpers = require('./http-helpers');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var sitePath = archive.paths.siteAssets + req.url;
  if(req.method === "GET"){
    if(req.url === "/"){
      console.log(sitePath);
      helpers.serveAssets(res, sitePath + 'index.html');
    }
    else{
      console.log("PAth:", sitePath);
      helpers.serveAssets(res, sitePath);
    }
  } else if(req.method === "POST") {
    req.on('data',function(data){
      data = data.toString();
      var url = data.split('=')[1];
      archive.isUrlInList(url, function (path) {
        helpers.serveAssets(res, path);
      });
    });
  }
};


