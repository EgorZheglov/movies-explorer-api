/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */
const validator = require('validator');

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(mail) {
        return validator.isEmail(mail);
      },
      message: 'Введён некорректный email',
    }
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
});

const model = mongoose.model('user', userSchema);

module.exports = model;
