const { DataTypes } = require('sequelize');
const { db } = require('../database/db');

const User = db.define('user', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    defaultValue: 0,
    
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

module.exports = User;