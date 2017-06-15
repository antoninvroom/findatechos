var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Find a techos - trouvez un CTO qui rejoindra votre aventure !' });
});

module.exports = router;
