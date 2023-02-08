const User = require('../models/users.model');
const Transfer = require('../models/transfers.models');
const catchAsync = require('../utils/catchAsync');

exports.createUsers = catchAsync(async (req, res) => {
  //Obtenemos el nombre y el password que el usuario ingrese
  const { name, password } = req.body;
  //generamos numero de cuenta aleatorio con math.random
  let accountNumber = Math.floor(Math.random() * 1000000);
  //Creamos unaconstante para guardar el valor de amount
  const amount = 1000;
  //Creamos el usuario con la informacion
  const newUser = await User.create({
    name: name.toLowerCase(),
    accountNumber,
    password,
    amount,
  });
  //Enviamos la respuesta al cliente
  res.status(201).json({
    status: 'success',
    message: 'The User was created successfully',
    newUser: {
      name,
      accountNumber,
      amount,
    },
  });
});

exports.logins = catchAsync(async (req, res) => {
  //1. Recibimos el accountNumber y passwor
  const { accountNumber, password } = req.body;
  //2. buscamos elusuario donde el status sea true, el accountNumbrer y password sea el que esta en la base de datos
  // 
  const user = await User.findOne({
    where: {
      status: true,
      accountNumber,
      password,
    },
  });
  //3. si no existe el usuario enviamos un error 
  if (!user) {
    return next(new AppError('The user could not be found', 404));
  }
  //4. Enviamos la respuesta al cliente
  res.status(201).json({
    status: 'success',
    message: `Welcome user  ${user.name} successfully logged.`,
    newUser:{     
      name: user.name ,
      accountNumber,
      password,
    }
  });
});


