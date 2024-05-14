// editMovie.js
import { toast } from 'react-toastify';

const editMovie = async (id, rating, movies, setMovies, setEditId) => {
  try {
    if (rating < 1 || rating > 5) {
      toast.error('Rating must be between 1 and 5.');
      return;
    }

    const body = { rating };
    await fetch(`http://localhost:5001/dashboard/movies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.token,
      },
      body: JSON.stringify(body),
    });
    const updatedMovies = movies.map((movie) =>
      movie.movie_id === id ? { ...movie, rating } : movie
    );
    setMovies(updatedMovies);
    setEditId(null);
    toast.success('Movie rating updated successfully!');
  } catch (err) {
    console.error(err.message);
  }
};

export default editMovie;
