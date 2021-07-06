const express = require('express');
const auth = require('./auth');
const user = require('./user');
const post = require('./post');
const about = require('./about');

const router = express.Router();

router.use('/api/v1/auth', auth);
router.use('/api/v1/user', user);
router.use('/api/v1/about', about);
router.use('/api/v1/post', post);

module.exports = router;
