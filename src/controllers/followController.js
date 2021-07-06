const followService = require('./../services/followService');
const catchAsync = require('./../utils/catchAsync');

exports.follow = catchAsync(async (req, res, next) => {
  const newFollower = await followService.follow(
    req.sUserId,
    req.body.followingId
  );

  res.status(200).json({
    status: 'success',
    data: {
      newFollower
    }
  });
});
exports.unFollow = catchAsync(async (req, res, next) => {
  await followService.unFollow(req.sUserId, req.body.followingId);

  res.status(200).json({
    status: 'success'
  });
});

exports.getAllFollowings = catchAsync(async (req, res, next) => {
  const allFollowings = await followService.getAllFollowingsList(req.sUserId);

  res.status(200).json({
    status: 'success',
    data: {
      allFollowings
    }
  });
});

exports.getAllNotFollowingUsers = catchAsync(async (req, res, next) => {
  const notFollowings = await followService.notFollowingUsers(req.sUserId);

  res.status(200).json({
    status: 'success',
    data: {
      notFollowings
    }
  });
});

exports.getFollowingsCount = catchAsync(async (req, res, next) => {
  const count = await followService.getFollowingsCount(req.sUserId);

  res.status(200).json({
    status: 'success',
    data: {
      count
    }
  });
});

exports.getFollowersCount = catchAsync(async (req, res, next) => {
  const count = await followService.getFollowersCount(req.sUserId);

  res.status(200).json({
    status: 'success',
    data: {
      count
    }
  });
});
