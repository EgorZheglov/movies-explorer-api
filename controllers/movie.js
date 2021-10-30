/* eslint-disable no-lonely-if */
/* eslint-disable linebreak-style */
const BadRequestError = require('../utils/BadRequestError');
const NotFoundError = require('../utils/NotFoundError');

const Movie = require('../models/movie');

const getAllMovies = (req, res, next) => Movie.find({}).then((cards) => res.status(200).send(cards))
  .catch((err) => next(err));

const deleteMovie = (req, res, next) => Movie.findById(req.params.id)
  .then((movie) => {

    if (!movie) {
      next(new NotFoundError('Данные не найдены'));
    } else {
      Movie.deleteOne(movie)
          .then(() => res.status(200).send(movie));
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Введены неправильные данные'));
    } else {
      next(err);
    }
  });

const addMovie = (req, res, next) => {
  const { nameRU, nameEN, director, country, year, description, image, trailer, thumbnail, movieId } = req.body;
  const owner = req.user;

  return Movie.create({ nameRU, nameEN, director, country, year, description, image, trailer, thumbnail, movieId, owner })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('данные не прошли валидацию'));
      } else {
        next(err);
      }
    });
};


module.exports = {
  getAllMovies,
  addMovie,
  deleteMovie,
};

/* Большое спасибо за понятное ревью, */
/* Извиняюсь за невнмательность. */
