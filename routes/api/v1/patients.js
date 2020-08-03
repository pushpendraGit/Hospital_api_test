const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/register',passport.authenticate('jwt',{session:false}),require('../../../controllers/api/v1/patient_api').register);
router.post('/:id/create_report',passport.authenticate('jwt',{session:false}) ,require('../../../controllers/api/v1/patient_api').createReport);
router.post('/:id/all_reports', require('../../../controllers/api/v1/patient_api').allreports);
module.exports = router;