// Import necessary modules
const express = require('express');
const router = express.Router();
const pool = require('../db'); // Assuming you have a pool for database connections

// Route handler for fetching movie title suggestions
router.get('/movies/suggestions', async (req, res) => {
  try {
    // Get the search query from the request query parameters
    const query = req.query.query.toLowerCase(); // Convert to lowercase for case-insensitive search

    // Query the available_movies table for movie titles matching the search query
    const response = await pool.query(
      `SELECT title FROM available_movies WHERE LOWER(title) LIKE $1`,
      [`%${query}%`] // Use LIKE operator for substring search
    );

    // Extract movie titles from the database response
    const suggestions = response.rows.map((row) => row.title);

    // Send the list of movie title suggestions as JSON response
    res.json(suggestions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Export the router to use in the main application
module.exports = router;
