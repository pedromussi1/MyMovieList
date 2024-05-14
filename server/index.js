const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(express.json());
app.use(cors());

// Import route handlers
const jwtAuthRouter = require("./routes/jwtAuth");
const dashboardRouter = require("./routes/dashboard");
const movieRoutesRouter = require("./routes/movieRoutes");
const suggestionsRouter = require("./routes/suggestions"); // Import the suggestions router

// Mount route handlers
app.use("/auth", jwtAuthRouter);
app.use("/dashboard", dashboardRouter);
app.use("/dashboard", movieRoutesRouter);
app.use("/dashboard", suggestionsRouter); // Mount the suggestions router under the '/dashboard' path

app.listen(5001, () => {
    console.log("Server is running on port 5001");
});
