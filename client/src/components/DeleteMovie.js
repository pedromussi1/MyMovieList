// deleteMovie.js
import { toast } from 'react-toastify';

const deleteMovie = async (id, movies, setMovies) => {
  try {
    await fetch(`http://localhost:5001/dashboard/movies/${id}`, {
      method: 'DELETE',
      headers: { token: localStorage.token },
    });
    setMovies(movies.filter((movie) => movie.movie_id !== id));
    toast.success('Movie deleted successfully!');
  } catch (err) {
    console.error(err.message);
  }
};

export default deleteMovie;
