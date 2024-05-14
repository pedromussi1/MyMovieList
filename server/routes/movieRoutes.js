const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

// Get all movies for a user
router.get("/", authorization, async (req, res) => {
  try {
    const user_id = req.user;

    const movies = await pool.query("SELECT * FROM movies WHERE user_id = $1", [
      user_id,
    ]);

    res.json(movies.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Add a new movie
router.post("/", authorization, async (req, res) => {
  try {
    const { title, rating } = req.body;
    const user_id = req.user;

    const newMovie = await pool.query(
      "INSERT INTO movies (title, rating, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, rating, user_id]
    );

    res.json(newMovie.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update a movie
router.put("/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, rating } = req.body;
    const user_id = req.user;

    const updatedMovie = await pool.query(
      "UPDATE movies SET title = $1, rating = $2 WHERE movie_id = $3 AND user_id = $4 RETURNING *",
      [title, rating, id, user_id]
    );

    if (updatedMovie.rows.length === 0) {
      return res.status(404).json("Movie not found or unauthorized");
    }

    res.json(updatedMovie.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete a movie
router.delete("/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user;

    const deletedMovie = await pool.query(
      "DELETE FROM movies WHERE movie_id = $1 AND user_id = $2 RETURNING *",
      [id, user_id]
    );

    if (deletedMovie.rows.length === 0) {
      return res.status(404).json("Movie not found or unauthorized");
    }

    res.json("Movie deleted successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
