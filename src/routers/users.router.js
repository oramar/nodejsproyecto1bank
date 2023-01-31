const { Router } = require('express');
const router = Router();
router.post('/signup', "hola mundo");
router.post('/login', '');
router.get('/:id/history', '');
module.exports = {
    usersRouter: router,
  };