var express = require('express');
var router = express.Router();

var bugService = require('../services/dataService');


router.get('/', function(req, res, next) {
 bugService
  	.getAll()
  	.then(function(bugs){
  		res.json(bugs);
  	})
  	.catch(function(err){
  		res.status(500).end();
  	});
});

module.exports = router;
