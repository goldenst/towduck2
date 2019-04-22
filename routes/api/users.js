var express = require ('express');
var router = express.Router();

// @route api/user/test
// @desc test user route
// @access Public
router.get('/test', (req, res) => res.json({msg: 'users works'}));

module.exports = router;