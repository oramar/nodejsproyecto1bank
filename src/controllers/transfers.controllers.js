const Transfer = require('../models/transfers.models');
const User = require('../models/users.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createTransfer = catchAsync(async (req, res, next) => {
  //1. Recibir el monto, accountSenderUser, accountReceiverUser
  const { amount, acccountSenderUser, acccountReceiverUser } = req.body;
  //2. Buscar usuario por el numero de cuenta y estado sea true que envia el monto
  const senderUser = await User.findOne({
    where: {
      status: true,
      accountNumber: acccountSenderUser,
    },
  });
  //3. Buscar usuario por el numero de cuenta y estado sea true que recibe el monto
  const receiverUser = await User.findOne({
    where: {
      status: true,
      accountNumber: acccountReceiverUser,
    },
  });

  //4. Crear una constante para guarda id del que envia y recibe el monto
  const userSenderId = senderUser.id;
  const userReceiverId = receiverUser.id;

  //5. Verificar si el monto trasferir es mayor al monto al monto que tiene el usuario
  if(senderUser.amount < amount){
    return next(new AppError('Insufficient funds, the transaction cannot be made.', 404));
  }

  //6. Verificar si el usuario que recibe es igual al usuario que envia. enviar un error
  if(userReceiverId===userSenderId){
    return next(new AppError('cannot be transferred from the same account..', 404));
  }

  //7. Crear una constante para el newMountUsermakeTransfer y newMountUserReceiverTransfer para cacturas el saldo de la cuenta
  const newMountUsermakeTransfer = +(senderUser.amount - amount);
  const newMountUserReceiverTransfer = +receiverUser.amount + amount;

  //8. Actualizamo el monto de los usuarios
  await senderUser.update({ amount: newMountUsermakeTransfer });
  await receiverUser.update({ amount: newMountUserReceiverTransfer });

  //9. Guardar la transferencia en la base de datos
  const newTransfer = await Transfer.create({
    amount,
    senderUserId: userSenderId,
    receiverUserId: userReceiverId,
  });

  res.status(201).json({
    status: 'success',
    message: 'The Transfer was created successfully',
    newTransfer,
  });
});
