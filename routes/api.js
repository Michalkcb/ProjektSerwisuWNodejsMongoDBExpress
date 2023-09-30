const express = require('express');
const router = express.Router();
const News = require('../models/news');
const defaultSort = -1;

/* GET home page. */
router.get('/', (req, res) => {
  const search = req.query.search || '';
  let sort = req.query.sort || defaultSort;

  if (sort !== -1 || sort !== 1) {
    sort = defaultSort;
  }

  const findNews = News
    .find({ title: new RegExp(search.trim(), 'i') })
    .sort({ created: sort })
    .select('_id title description');

  findNews.exec((err, data) => {
    res.json(data);
  });
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  const findNews = News
    .findById(id)
    .select('_id title description');

  findNews.exec((err, data) => {
    res.json(data);
  });
});

module.exports = router;
