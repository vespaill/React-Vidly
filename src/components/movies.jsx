import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import MoviesTable from './moviesTable';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import { getMovies, deleteMovie, saveMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import { paginate } from '../utils/paginate';
import { mapToViewModel } from './../utils/mapToViewModel';
import _ from 'lodash';
import SearchBox from './searchBox';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: '',
    selectedGenre: null,
    sortColumn: { path: 'title', order: 'asc' }
  };

  /**
   * Lifecycle hook is invoked immediately after the component is inserted into
   * the tree. Fetches data from the Movies and Genres APIs.
   */
  async componentDidMount() {
    const { data: movies } = await getMovies();
    const { data: genres } = await getGenres();
    const selectedGenre = { _id: '', name: 'All Genres' };
    genres.unshift(selectedGenre);

    this.setState({ movies, genres, selectedGenre, searchQuery: '' });
  }

  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error('This movie has already been deleted.');

      this.setState({ movies: originalMovies });
    }
  };

  handleLike = async movie => {
    const movies = [...this.state.movies]; /* Copy the movies array. */
    const index = movies.indexOf(movie); /* Find index of movie to like. */
    movies[index] = { ...movie }; /* Copy movie props into corresponding elem */
    movies[index].liked = !movies[index].liked; /* Toggle elem's liked prop */
    this.setState({ movies }); /* Update state with new movies array. */
    await saveMovie(mapToViewModel(movies[index])); /* Persist in backend */
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, searchQuery: '', currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
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
      searchQuery,
      movies: allMovies
    } = this.state;

    const moviesFilteredGenre =
      searchQuery === '' && selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies.filter(m =>
            m.title.toLowerCase().includes(searchQuery.toLowerCase())
          );

    const sorted = _.orderBy(
      moviesFilteredGenre,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: moviesFilteredGenre.length, movies };
  };

  render() {
    const { length: count } = this.state.movies;

    if (count === 0) return <p>There are no movies in the database</p>;

    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { totalCount, movies } = this.getPagedData();
    const { user } = this.props;

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
          {user && (
            <Link className="btn btn-primary mb-3" to="/movies/new">
              New Movie
            </Link>
          )}
          <p>Showing {totalCount} movies in the database</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
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
