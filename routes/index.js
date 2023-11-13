var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' });
});

router.get('/services', function(req, res, next) {
  res.render('Services', { title: 'Express' });
});

router.get('/contactus', function(req, res, next) {
  res.render('ContactUs', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});

router.get('/signin', function(req, res, next) {
  res.render('signin', { title: 'Express' });
});

module.exports = router;
