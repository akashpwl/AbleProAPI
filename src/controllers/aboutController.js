const aboutService = require('./../services/aboutService');
const catchAsync = require('./../utils/catchAsync');

exports.getUserDetails = catchAsync(async (req, res, next) => {
  const about = await aboutService.getUserDetails(req.sUserId);

  res.status(200).json({
    status: 'success',
    data: {
      about
    }
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const about = await aboutService.create(req.body.email, req.body.name);

  res.status(201).json({
    status: 'success',
    data: {
      about
    }
  });
});

exports.update = catchAsync(async (req, res, next) => {
  if(req.user.name != req.body.name){
    await aboutService.updateUserName(req.user.id, req.body.name); // update name in mongodb as well.
  }
  const updatedAbout = await aboutService.update(req.sUserId, req.body);
  res.status(200).json({
    status: 'success',
    data: {
      updatedAbout
    }
  });
});
