const User = require('../models/users.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validIfExistUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      status: true,
      id,
    },
  });

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  req.user = user;
  next();
});

exports.validIfExistUserByName = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  const user = await User.findOne({
    where: {
      name: name.toLowerCase(),
    },
  });

  if (user) {
    return next(new AppError('User exit', 404));
  }

  req.user = user;
  next();
});

