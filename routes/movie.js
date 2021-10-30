/* eslint-disable linebreak-style */
const movie = require('express').Router();
const {
  getAllMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movie');

const {
  validateMoviePost,
} = require('../middlewares/inputRequestValidation');

movie.get('/movies', getAllMovies);
movie.post('/movies', validateMoviePost, addMovie);
movie.delete('/movies/:id', deleteMovie);

module.exports = movie;
