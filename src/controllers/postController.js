const postService = require('./../services/postService');
const catchAsync = require('./../utils/catchAsync');

exports.createPost = catchAsync(async (req, res, next) => {
  const newPost = await postService.createPost(
    req.sUserId,
    req.body.url,
    req.body.caption
  );
  res.status(201).json({
    status: 'success',
    data: {
      newPost
    }
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const allPost = await postService.getAllPost(req.sUserId);

  res.status(200).json({
    status: 'success',
    data: {
      allPost
    }
  });
});
