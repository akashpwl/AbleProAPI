const likeService = require('./../services/likeService');
const catchAsync = require('./../utils/catchAsync');

exports.like = catchAsync(async (req, res, next) => {
  const newLike = await likeService.likePost(req.sUserId, req.body.PostId);
  res.status(200).json({
    status: 'success',
    data: {
      newLike
    }
  });
});

exports.unlike = catchAsync(async (req, res, next) => {
  await likeService.unlikePost(req.sUserId, req.body.PostId);
  res.status(200).json({
    status: 'success'
  });
});
