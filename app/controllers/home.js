var express = require('express');
var router = express.Router();
var Busboy = require('busboy');
var blobStorage = require('../services/blobStorage');
var Article = require('../models/article');
var Config = require('../../config/config');

module.exports = function(app) {
  app.use('/', router);
};

router.get('/', function(req, res, next){
  //throw new Error("Failed!!");
  var articles = [new Article(), new Article()];
  res.render('index', {
    title: Config.app.name,
    articles: articles
  });
});
router.post('/upload', function (req, res) {
  console.log('got here');
  var busboy = new Busboy({ headers: req.headers });

  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    blobStorage.saveToBlob(filename, file, function (err, result) {
      if (err) {
        res.send(500, err);
      }
      else {
        res.redirect('/show?name=' + encodeURI(filename));
      }
    });
  });
  req.pipe(busboy);
});
router.get('/show', function (req, res) {
  res.render('show', {
    name: req.query.name,
    url: blobStorage.getUrl(req.query.name)
  });
});
