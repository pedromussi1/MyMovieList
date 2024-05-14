// Movie.js
import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
// import { toast } from 'react-toastify';
import addMovie from './AddMovie'; // Import the addMovie function
import editMovie from './EditMovie'; // Import the editMovie function
import deleteMovie from './DeleteMovie'; // Import the deleteMovie function
import renderStars from './renderStars'; // Import the renderStars function
import {
  onChange,
  onSuggestionsFetchRequested,
  onSuggestionsClearRequested,
  renderSuggestion,
  getSuggestionValue,
  getSuggestionsContainer
} from './suggestions'; // Import suggestion functions

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');
  const [editId, setEditId] = useState(null);
  const [newMovieRating, setNewMovieRating] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      const response = await fetch('http://localhost:5001/dashboard/movies', {
        method: 'GET',
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      setMovies(parseRes);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleEdit = (id) => {
    setEditId(id);
    const movieToEdit = movies.find((movie) => movie.movie_id === id);
    setRating(movieToEdit.rating);
  };

  return (
    <div className="movie-list">
      <table className="table table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Title</th>
            <th scope="col">Rating</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.movie_id}>
              <td>{movie.title}</td>
              <td>
                {editId === movie.movie_id ? (
                  <input
                    type="number"
                    value={rating}
                    onChange={(e) => {
                      const rating = parseInt(e.target.value);
                      if (!isNaN(rating)) {
                        setRating(Math.min(Math.max(rating, 1), 5));
                      } else {
                        setRating('');
                      }
                    }}
                    className="form-control"
                  />
                ) : (
                  <div onClick={() => handleEdit(movie.movie_id)}>
                    {renderStars(movie.rating)}
                  </div>
                )}
              </td>
              <td>
                {editId === movie.movie_id ? (
                  <button
                    className="btn btn-success mr-2"
                    onClick={() => editMovie(movie.movie_id, rating, movies, setMovies, setEditId)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="btn btn-warning mr-2"
                    onClick={() => {
                      setRating(movie.rating);
                      setEditId(movie.movie_id);
                    }}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="btn btn-danger"
                  onClick={() => deleteMovie(movie.movie_id, movies, setMovies)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-movie">
        <h2>Add New Movie</h2>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={(value) => onSuggestionsFetchRequested(value, setSuggestions)}
          onSuggestionsClearRequested={() => onSuggestionsClearRequested(setSuggestions)}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={{
            placeholder: 'Movie Title',
            value: title,
            onChange: (event, { newValue }) => onChange(event, { newValue }, setTitle, setSelectedSuggestion),
            className: "form-control"
          }}
          onSuggestionSelected={(event, { suggestion }) => setSelectedSuggestion(suggestion)}
          suggestionsContainer={getSuggestionsContainer}
        />
        <input
          type="number"
          placeholder="Rating"
          value={newMovieRating}
          onChange={(e) => {
            const rating = parseInt(e.target.value);
            if (!isNaN(rating)) {
              setNewMovieRating(Math.min(Math.max(rating, 1), 5));
            } else {
              setNewMovieRating('');
            }
          }}
          className="form-control"
        />
        <button
          className="btn btn-primary mt-3"
          onClick={() => addMovie(title, newMovieRating, movies, setMovies, setTitle, setNewMovieRating, setSelectedSuggestion)}
          disabled={!selectedSuggestion}
        >
          Add Movie
        </button>
      </div>
    </div>
  );
};

export default Movie;
