const { Router } = require('express');
const { createUsers, logins, getHistory } = require('../controllers/users.controllers');
const { validIfExistUserByName } = require('../middlewares/user.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');
const routerUser = Router();

routerUser.post('/signup', validateFields,validIfExistUserByName, createUsers);
routerUser.post('/login', logins);

/*module.exports = {
  usersRouter: router,
};*/
module.exports = routerUser
