var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'My App' });
  res.json({ title: 'Welcome to Data file /data to get the files' });
});

module.exports = router;
