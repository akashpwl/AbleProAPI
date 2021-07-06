const express = require('express');
const authController = require('./../controllers/authController');
const followController = require('./../controllers/followController');

const router = express.Router();

router.patch(
  '/changePassword',
  authController.protect,
  authController.updatePassword
);

router.get(
  '/followings',
  authController.protect,
  followController.getAllFollowings
);
router.post('/follow', authController.protect, followController.follow);
router.post('/unfollow', authController.protect, followController.unFollow);
router.get(
  '/not-followings',
  authController.protect,
  followController.getAllNotFollowingUsers
);

router.get(
  '/followers-count',
  authController.protect,
  followController.getFollowersCount
);

router.get(
  '/followings-count',
  authController.protect,
  followController.getFollowingsCount
);

module.exports = router;
