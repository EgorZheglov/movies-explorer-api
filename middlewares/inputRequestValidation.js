/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */

const { celebrate, Joi } = require('celebrate');

// email и link валидируются непосредственно в схеме
const validateUsersPost = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/https?:\/\/w*\.?\w+\.\w+/),
  })
});

const validateMoviePost = celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().required().min(2).max(30),
    nameEN: Joi.string().required().min(2).max(30),
    director: Joi.string().required(),
    country: Joi.string().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    trailer: Joi.string().pattern(/https?:\/\/w*\.?\w+\.\w+/).required(),
    thumbnail: Joi.string().pattern(/https?:\/\/w*\.?\w+\.\w+/).required(),
    movieId: Joi.string().required(),
  })
});


const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string(),
  }),
});

module.exports = {
  validateUsersPost,
  validateMoviePost,
  validateUserLogin,
  validateUpdateUser,
};