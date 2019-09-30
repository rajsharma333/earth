const express = require('express');

const router = express.Router();

// @route   GET  api/jobpost
// @desc    Test Router
// @access  Public

router.get('/', (req, res) => res.send('Job Post Route'));

module.exports = router;
