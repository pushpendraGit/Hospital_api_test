const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use('/:status',passport.authenticate('jwt',{session:false}) ,require('../../../controllers/api/v1/reports_api'));


module.exports = router;