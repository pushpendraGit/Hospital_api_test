const express = require('express');
const router = express.Router();


router.use('/register' , require('../../../controllers/api/v1/doctors_api').register);
router.use('/login' , require('../../../controllers/api/v1/doctors_api').login);



module.exports = router;