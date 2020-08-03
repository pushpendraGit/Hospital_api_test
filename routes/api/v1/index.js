const express = require('express');
const router = express.Router();

//index.js routing to various routes like patient doctor to make a scalable structure of the project
router.use('/patients', require('./patients'));
router.use('/doctors', require('./doctors'));
router.use('/reports', require('./reports'));

module.exports = router;