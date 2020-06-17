import React, { Component } from 'react';
import MoviesTable from './moviesTable';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import { paginate } from '../utils/paginate';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    selectedGenre: {},
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: 'title', order: 'asc' }
  };

  /**
   * Lifecycle hook is invoked immediately after the component is inserted into
   * the tree. Fetches data from the Movies and Genres APIs.
   */
  componentDidMount() {
    const selectedGenre = { _id: '', name: 'All Genres' };
    this.setState({
      movies: getMovies(),
      genres: [selectedGenre, ...getGenres()],
      selectedGenre
    });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies]; /* Copy the movies array. */
    const index = movies.indexOf(movie); /* Find index of movie to like. */
    movies[index] = { ...movie }; /* Copy movie props into corresponding elem */
    movies[index].liked = !movies[index].liked; /* Toggle elem's liked prop */
    this.setState({ movies }); /* Update state with new movies array. */
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  /**
   * Returns a subset of the movies array that is filtered by the selectedGenre,
   * ordered by the sortColumn, and paginated acording to the currentPage and
   * pageSize.
   */
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      movies: allMovies
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, movies };
  };

  render() {
    const { length: count } = this.state.movies;

    if (count === 0) return <p>There are no movies in the database</p>;

    const { pageSize, currentPage, sortColumn } = this.state;
    const { totalCount, movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <Link className="btn btn-primary mb-3" to='/movies/new'>New Movie</Link>
          <p>Showing {totalCount} movies in the database</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
