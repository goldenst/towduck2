var express = require ('express');
var router = express.Router();

// @route api/profile/test
// @desc test profile route
// @access Public
router.get('/test', (req, res) => res.json({msg: 'profile works'}));

module.exports = router;