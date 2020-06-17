import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { getGenres } from '../services/fakeGenreService';
import { getMovie, saveMovie } from '../services/fakeMovieService';

class MovieForm extends Form {
  state = {
    data: { title: '', genreId: '', numberInStock: '', dailyRentalRate: '' },
    genres: [],
    errors: {}
  };

  schema = {
    // Optional
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number()
      .integer()
      .required()
      .min(0)
      .max(100)
      .label('Number in stock'),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label('Daily Rental Rate')
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const { history, match } = this.props;
    const movieId = match.params.id;
    if (movieId === 'new') return;

    const movie = getMovie(movieId);
    if (!movie) return history.replace('/not-found');

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push('/movies');
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title', 'text', true)}
          {this.renderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput('numberInStock', 'Number in stock')}
          {this.renderInput('dailyRentalRate', 'Rate')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}

export default MovieForm;
