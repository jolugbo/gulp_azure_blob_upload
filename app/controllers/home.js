const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const Config = require('../../config/config')

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  const articles = [new Article(), new Article()];
  res.render('index', {
    title: Config.app.name,
    articles: articles
  });
});
