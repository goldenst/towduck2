var express = require ('express');
var router = express.Router();

// @route api/posts/test
// @desc test post route
// @access Public
router.get('/test', (req, res) => res.json({msg: 'posts works'}));

module.exports = router;