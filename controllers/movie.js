/* eslint-disable no-lonely-if */
/* eslint-disable linebreak-style */
const BadRequestError = require('../utils/BadRequestError');
const NotFoundError = require('../utils/NotFoundError');
const ForbiddenError = require('../utils/ForBiddenError');

const Movie = require('../models/movie');

const getAllMovies = (req, res, next) => Movie.find({ owner: req.user._id }).then((cards) => res.status(200).send(cards))
  .catch((err) => next(err));

const deleteMovie = (req, res, next) => Movie.findById(req.params.id)
  .then((movie) => {
    const owner = req.user;

    if (!movie) {
      next(new NotFoundError('Данные не найдены'));
    } else {
      if (owner._id !== movie.owner.toString()) {
        next(new ForbiddenError('Недостаточно прав'));
      } else {
        Movie.deleteOne(movie)
          .then(() => res.status(200).send(movie));
      }
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
  const {
    nameRU,
    nameEN,
    director,
    duration,
    country,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
  } = req.body;

  const owner = req.user;

  return Movie.create({
    nameRU,
    nameEN,
    director,
    duration,
    country,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      console.log(err);
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

