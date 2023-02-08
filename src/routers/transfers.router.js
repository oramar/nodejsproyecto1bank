const { Router } = require('express');
const { createTransfer } = require('../controllers/transfers.controllers');
const { validIfExistAcccountSenderUser, validIfExistAcccountReceiverUser, validMountSenderUser, validMountReceiverUser } = require('../middlewares/transfer.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');
const routerTransfer = Router();

routerTransfer.post('/', 
validateFields,

createTransfer);


module.exports = routerTransfer