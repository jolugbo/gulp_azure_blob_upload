const express = require('express');
const router = express.Router();
const Busboy = require('busboy');
const blobStorage = require('../services/blobStorage');
const Article = require('../models/article');
const Config = require('../../config/config');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  //throw new Error("Failed!!");
  const articles = [new Article(), new Article()];
  res.render('index', {
    title: Config.app.name,
    articles: articles
  });
});
router.post('/upload', function(req,res){
  var busboy = new Busboy({headers:req.headers});

  busboy.on('file',function(fieldname,file,filename,encoding,mimetype){
    blobStorage.saveToBlob(filename,file,function(err,result){
      if (err) {
        res.send(500,err);
      }
      else{
        res.redirect('/show?name=' + encodeURI(filename));
      }
    });
  });
  req.pipe(busboy);
});
router.get('/show',function(req,res){
  res.render('show',{
    name:req.query.name,
    url: blobStorage.getUrl(req.query.name)
  });
});
