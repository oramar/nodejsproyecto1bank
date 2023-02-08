const Transfer = require('../models/transfers.models');
const User = require('../models/users.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
//Validar s usuario existe, por el numero de cuenta
exports.validIfExistAcccountSenderUser = catchAsync(async (req, res, next) => {
  const { accountNumberSenderUser  } = req.params;

  const user = await User.findOne({
    where: {
      accountNumber: accountNumberSenderUser,
    },
  });

  if (!user) {
    return next(new AppError('the account number of the sending user does not exist.', 404));
  }

  req.user = user;
  next();
});

exports.validIfExistAcccountReceiverUser = catchAsync(async (req, res, next) => {
    const { accountNumberReceiverUser } = req.params;
  
    const user = await User.findOne({
      where: {
        accountNumber: accountNumberReceiverUser,
      },
    });
  
    if (!user) {
      return next(new AppError('the account number of the recipient user does not exist..', 404));
    }
  
    req.user = user;
    next();
  });

exports.validMountSenderUser = catchAsync(async (req, res, next) => {
  const { amount, senderUserId } = req.params;

  const user = await User.findOne({
    where: {
      id: senderUserId,
    },
  });

  if (!user) {
    return next(new AppError('The user not exist', 404));
  }

  if (res.amount < amount) {
    return next(new AppError('amount to send is higher than available', 404));
  }

  req.user = user;
  next();
});

exports.validMountReceiverUser= catchAsync(async (req, res, next) => {
    const { id } = req.params;
  
    const user = await User.findOne({
      where: {
        id,
      },
    });
  
    if (!user) {
      return next(new AppError('The user not exist', 404));
    }
  
    if (res.amount < amount) {
      return next(new AppError('amount to send is higher than available', 404));
    }
  
    req.user = user;
    next();
  });
