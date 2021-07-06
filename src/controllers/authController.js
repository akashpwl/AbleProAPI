const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/gmail');
const authService = require('./../services/authService');
const aboutService = require('./../services/aboutService');
const emailTemplate = require('./../utils/emailTemplate');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};
let sUserId;
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const tokenExpiresIn =
    process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000;

  const cookieOptions = {
    expires: new Date(Date.now() + tokenExpiresIn),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    tokenExpiresIn,
    data: {
      userId: sUserId.id,
      user
    }
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  };

  const newUser = await authService.signup(userData); // moongoose new user
  await aboutService.create(userData.email, userData.name); // sequelize new user
  res.status(201).json({
    status: 'success',
    data: {
      newUser
    }
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  const user = await authService.login(email); //await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  sUserId = await aboutService.findUserByEmail(user.email);
  createSendToken(user, 200, res);
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await authService.findOneUser({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  const OTP = await user.createOTP();
  await user.save({ validateBeforeSave: false });

  const message = emailTemplate(user.name, OTP);

  try {
    await sendEmail({
      email: user.email,
      subject: 'OTP for password Reset (valid for 10 min)',
      message
    });

    res.status(200).json({
      status: 'success',
      message: 'OTP sent to email!'
    });
  } catch (err) {
    user.passwordResetOTP = undefined;
    user.passwordResetOTPExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedOTP = crypto
    .createHash('sha256')
    .update(req.body.otp)
    .digest('hex');

  const user = await authService.findOneUser({
    email: req.body.email,
    passwordResetOTP: hashedOTP,
    passwordResetOTPExpires: { $gt: Date.now() }
  });

  if (!user) {
    return next(new AppError('OTP is invalid or has expired', 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetOTP = undefined;
  user.passwordResetOTPExpires = undefined;
  await user.save();

  res.status(200).json({
    status: 'success'
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  const currentUser = await authService.findUserbyId(decoded.id); //await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }
  const currentSequelizeUser = await aboutService.findUserByEmail(
    currentUser.email
  );
  req.sUserId = currentSequelizeUser.dataValues.id;
  req.user = currentUser;
  next();
});
exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await authService.updatePassword(req.user.id); //.select('+password'); //await User.findById(req.user.id).select('+password');

  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  createSendToken(user, 200, res);
});

exports.checkEmailAlreadyExists = catchAsync(async (req, res, next) => {
  const user = await authService.findOneUser({email:req.body.email});

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
})

