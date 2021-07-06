const express = require('express');
const authController = require('./../controllers/authController');
const postController = require('./../controllers/postController');
const likeController = require('./../controllers/likeController');

const router = express.Router();

router.post('/', authController.protect, postController.createPost);
router.get('/', authController.protect, postController.getPost);

router.post('/like', authController.protect, likeController.like);
router.post('/unlike', authController.protect, likeController.unlike);

module.exports = router;
