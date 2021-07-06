const express = require('express');
const authController = require('./../controllers/authController');
const aboutController = require('./../controllers/aboutController');

const router = express.Router();

router.post('/', aboutController.create);
router.patch('/',authController.protect, aboutController.update);
router.get('/', authController.protect, aboutController.getUserDetails);


module.exports = router;
