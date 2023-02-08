const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { db } = require('../database/db');
const globalErrorHandler = require('../controllers/error.controller');
const AppError = require('../utils/appError');
const routerUser = require('../routers/users.router');
const routerTransfer = require('../routers/transfers.router');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 9000;
    this.paths = {
      userpath: '/api/v1/users',
      transferpath: '/api/v1/transfer',
    };
    this.database();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }
    //UTILIZAMOS LAS CORS PARA PERMITIR ACCESSO A LA API
    this.app.use(cors());
    //UTILIZAMOS EXPRESS.JSON PARA PARSEAR EL BODY DE LA REQUEST
    this.app.use(express.json());
  }

  routes() {
    //utilizar las rutas de usuarios
    
    this.app.use(this.paths.userpath, routerUser);
    this.app.use(this.paths.transferpath, routerTransfer);

    this.app.all('*', (req, res, next) => {
      return next(
        new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
      );
    });
    this.app.use(globalErrorHandler);
  }
  
  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(error => console.log(error));

    db.sync()
      .then(() => console.log('Database synced'))
      .catch(error => console.log(error));
  }


  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}
module.exports = Server;
