/* eslint-disable linebreak-style */
const user = require('express').Router();
const {
  updateUser,
  getAuthUser,
} = require('../controllers/user');

const {
  validateUpdateUser,
} = require('../middlewares/inputRequestValidation');

user.get('/users/me', getAuthUser);
user.patch('/users/me', validateUpdateUser, updateUser);

module.exports = user;
