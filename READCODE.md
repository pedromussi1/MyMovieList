<h1>Code Breakdown</h1>

<p>This page should cover all the steps that were taken to create the JWT with PERN web application. Code snippets will be shown and explained, along with screenshots of how the database looks on PostgreSQL, analyzing how the database connects to the website in the localhost, and how JWT was used to implement authentication.</p>

<h2>Server</h2>

<h3>(Server) index.js:</h3>

<p>
express and app: Importing the Express framework and creating an instance of the application.
cors: Importing the CORS middleware to handle cross-origin requests.
pool: Importing the database connection from ./db.
Middleware:
express.json(): Middleware to parse incoming JSON requests.
cors(): Middleware to enable CORS, allowing the frontend to make requests to this backend from different origins.
Routes:
/auth: Mounting the JWT authentication routes from ./routes/jwtAuth.
/dashboard: Mounting the dashboard routes from ./routes/dashboard.
Server Start:
app.listen(5000, ...): Starting the Express server on port 5000 and logging a message to the console when the server starts.
</p>

<h3>db.js</h3>

<p>
Pool: Importing the Pool class from the pg module, which is used to create a pool of database connections.
pool: Creating a new instance of the Pool class with the following configurations:
user: The username to connect to the PostgreSQL database.
password: The password for the PostgreSQL user.
host: The hostname or IP address of the PostgreSQL server (in this case, it's localhost).
port: The port number on which the PostgreSQL server is running (default is 5432).
database: The name of the PostgreSQL database to connect to (in this case, it's "jwt").
module.exports: Exporting the pool instance so that it can be imported and used in other files, such as your main application file (app.js) or any route handlers that require database access.
</p>



<h3>jwtAuth.js</h3>

<p>
Router: Creating a new router instance from Express.
POST "/register": Handling registration of new users.
POST "/login": Handling user login.
GET "/is-verify": Verifying if the user is authenticated (authorization middleware is used to check the JWT token).
module.exports: Exporting the router for use in other files.
</p>

<h3>authorization.js</h3>

<p>
jwt: Importing the jsonwebtoken module.
dotenv: Importing and configuring dotenv to use environment variables.
module.exports: Exporting the middleware function to be used in other files.
req.header("token"): Extracting the JWT token from the "token" header of the request.
jwt.verify: Verifying the JWT token using the secret key stored in process.env.jwtSecret.
req.user: Storing the payload (user information) from the JWT token in req.user for use in subsequent middleware or routes.
next(): Calling the next middleware or route handler in the Express request-response cycle.
Error Handling: If the token is invalid or there's an error during verification, returning a "Not Authorized" error response with a 403 status code.
</p>

<h3>(Server) dashboard.js</h3>

<p>
Router: Creating a new router instance from Express.
GET "/": Handling the route to fetch user information.
authorization: Middleware to check if the user is authorized (i.e., if the JWT token is valid).
req.user: Contains the payload from the JWT token after authorization.
pool.query: Querying the database to fetch the user's name based on the user_id stored in req.user.
res.json: Sending the user's name as a JSON response.
module.exports: Exporting the router for use in other files.
</p>

<h2>Client</h2>

<h3>(Client) index.js</h3>

<p>
React: Importing the main React library.
ReactDOM: Importing the ReactDOM library, which is used to render React components to the DOM.
'./index.css': Importing the CSS file for styling.
App: Importing the main App component of the application.
ReactDOM.createRoot(document.getElementById('root')): Creating a new React root with the root DOM element, which is an asynchronous API to render React components.
root.render: Rendering the App component inside the React root. The <React.StrictMode> wraps the App component to enable React's strict mode, which helps identify potential problems in the application's code.
</p>

<h3>App.js</h3>

<p>
useState: Declaring a state variable isAuthenticated to track whether the user is authenticated or not.
setAuth: A function to update the isAuthenticated state variable.
isAuth: An asynchronous function to check if the user is authenticated by sending a request to the server with the JWT token stored in localStorage.
useEffect: Using useEffect to call the isAuth function when the component mounts.
Router and Routes: Using BrowserRouter, Routes, and Route from react-router-dom to set up the application's routing.
Routes: Defining the application's routes:
/ and /login: Display the Login component if the user is not authenticated, otherwise navigate to /dashboard.
/register: Display the Register component if the user is not authenticated, otherwise navigate to /login.
/dashboard: Display the Dashboard component if the user is authenticated, otherwise navigate to /login.
Navigate: Using Navigate from react-router-dom to navigate to different routes based on the authentication status.
toast.configure(): Configuring toast notifications to be used throughout the application.
</p>

<h3>Register.js</h3>

<p>
useState: Initializing state to store form input values (email, password, name).
onChange: Function to update the state with the current form input values as the user types.
onSubmitForm: Function to handle form submission:
Prepares the request body with form input values.
Sends a POST request to the registration endpoint (http://localhost:5000/auth/register).
Parses the response from the server.
If registration is successful, it stores the JWT token in localStorage, sets the authentication status to true, and displays a success toast message.
If registration fails, it sets the authentication status to false and displays an error toast message.
Form: Renders a form with input fields for email, password, and name, and a submit button to register.
Link: Provides a link to navigate to the Login page.
setAuth: A function passed as a prop from the parent component to update the authentication status in the parent component's state.
</p>

<h3>(Client) Dashboard.js</h3>

<p>
useState: Initializing state to store the user name.
getName: Asynchronous function to fetch the user name from the server:
Sends a GET request to the dashboard endpoint (http://localhost:5000/dashboard/).
Includes the JWT token from localStorage in the request headers.
Parses the response and sets the user name in the state.
logout: Function to handle logout:
Removes the JWT token from localStorage.
Sets the authentication status to false.
Displays a logout success toast message.
useEffect: Hook that runs the getName function when the component mounts to fetch and display the user name.
Dashboard: Renders the dashboard title with the user name and a logout button.
</p>

<h3>Login</h3>

<p>
useState: Initializing state to store form input values (email, password).
onChange: Function to update the state with the current form input values as the user types.
onSubmitForm: Function to handle form submission:
Prepares the request body with form input values.
Sends a POST request to the login endpoint (http://localhost:5000/auth/login).
Parses the response from the server.
If login is successful, it stores the JWT token in localStorage, sets the authentication status to true, and displays a success toast message.
If login fails, it sets the authentication status to false and displays an error toast message.
Form: Renders a form with input fields for email and password, and a submit button to login.
Link: Provides a link to navigate to the Register page.
setAuth: A function passed as a prop from the parent component to update the authentication status in the parent component's state.
</p>

<hr>

### <h3>(Server) index.js</h3>

<details>
<summary>Click to expand code</summary>

```js

// Importing required modules
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");  // Importing the database connection

// Middleware
app.use(express.json());  // Middleware to parse JSON requests
app.use(cors());  // Middleware to enable CORS (Cross-Origin Resource Sharing)

// Routes

// Authentication routes for registering and logging in users
app.use("/auth", require("./routes/jwtAuth"));

// Dashboard route to access user dashboard
app.use("/dashboard", require("./routes/dashboard"));

// Start the server
app.listen(5000, () => {
    console.log("Server is running on port 5000");  // Logging a message when the server starts
});

```
</details>

<hr>

### <h3>db.js</h3>

<details>
<summary>Click to expand code</summary>

```js

const Pool = require("pg").Pool;  // Importing the Pool class from the 'pg' module

// Creating a new Pool instance with database connection configurations
const pool = new Pool({
    user: "postgres",       // Database user
    password: "1234",       // Database password
    host: "localhost",      // Database host
    port: 5432,             // Database port
    database: "jwt"         // Database name
});

// Exporting the pool instance to be used in other files
module.exports = pool;


```
</details>

<hr>

### <h3>App.js</h3>

<details>
<summary>Click to expand code</summary>

```js

import React, { Fragment, useState, useEffect } from 'react';
import './App.css';

import { toast } from 'react-toastify';  // Importing toast notifications
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";  // Importing routing components

// Components
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";

toast.configure();  // Configuring toast notifications

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);  // State to track authentication status

  // Function to set authentication status
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  // Function to check if user is authenticated
  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token }  // Sending the JWT token stored in localStorage
      });

      const parseRes = await response.json();

      // Setting isAuthenticated based on the response
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth();  // Calling isAuth function when the component mounts
  });

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Routes>
            {/* Route to display Login component if not authenticated, otherwise navigate to Dashboard */}
            <Route exact path="/" element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/dashboard" />} />
            
            {/* Route to display Login component if not authenticated, otherwise navigate to Dashboard */}
            <Route exact path="/login" element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/dashboard" />} />
            
            {/* Route to display Register component if not authenticated, otherwise navigate to Login */}
            <Route exact path="/register" element={!isAuthenticated ? <Register setAuth={setAuth} /> : <Navigate to="/login" />} />
            
            {/* Route to display Dashboard component if authenticated, otherwise navigate to Login */}
            <Route exact path="/dashboard" element={isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;


```
</details>

<hr>

### <h3>jwtAuth.js</h3>

<details>
<summary>Click to expand code</summary>

```js

const router = require("express").Router();  // Importing the Router module from Express
const pool = require("../db");  // Importing the database connection
const bcrypt = require("bcrypt");  // Importing bcrypt for password hashing
const jwtGenerator = require("../utils/jwtGenerator");  // Importing the JWT token generator
const validInfo = require("../middleware/validInfo");  // Importing middleware for input validation
const authorization = require("../middleware/authorization");  // Importing middleware for authorization

// Registering a new user
router.post("/register", validInfo, async(req, res) => {
    try {
        // Destructure the request body (name, email, password)
        const { name, email, password} = req.body;

        // Check if user exists (if user exists, throw error)
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
        if(user.rows.length != 0){
            return res.status(401).json("User already exists");
        }

        // Bcrypt the user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        // Insert the new user into the database
        const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [name, email, bcryptPassword]);

        // Generate JWT token
        const token = jwtGenerator(newUser.rows[0].user_id);

        // Send token as response
        res.json({token});

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Login route
router.post("/login", validInfo, async(req, res) => {
    try {
        // Destructure the request body
        const {email, password} = req.body;

        // Check if user doesn't exist
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
        if(user.rows.length === 0){
            return res.status(401).json("Password or Email is incorrect");
        }

        // Check if incoming password matches the database password
        const validPassword =  await bcrypt.compare(password, user.rows[0].user_password);
        if(!validPassword){
            return res.status(401).json("Password or Email is incorrect");
        }

        // Generate JWT token
        const token = jwtGenerator(user.rows[0].user_id);

        // Send token as response
        res.json({token});

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Verify user route
router.get("/is-verify", authorization, async (req, res) => {
    try {
        // Send true if user is verified
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;  // Exporting the router


```
</details>

<hr>

### <h3>(Server) dashboard.js</h3>

<details>
<summary>Click to expand code</summary>

```js

const router = require("express").Router();  // Importing the Router module from Express
const pool = require("../db");  // Importing the database connection
const authorization = require('../middleware/authorization');  // Importing middleware for authorization

// Get user information route
router.get("/", authorization, async(req, res) => {
    try {
        // req.user has the payload from the JWT token
        // Fetch user name from the database based on user_id stored in req.user

        const user = await pool.query("SELECT user_name FROM users WHERE user_id = $1", [req.user]);

        // Send the user's name as a response
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

module.exports = router;  // Exporting the router


```
</details>

<hr>

### <h3>authorization.js</h3>

<details>
<summary>Click to expand code</summary>

```js

const jwt = require("jsonwebtoken");  // Importing the jsonwebtoken module
require("dotenv").config();  // Importing and configuring dotenv for environment variables

module.exports = async(req, res, next) => {
    try {
        const jwtToken = req.header("token");  // Extracting the JWT token from the request header

        // If no token is found in the header, return an error response
        if(!jwtToken){
            return res.status(403).json("Not Authorized");
        }

        // Verifying the JWT token using the secret key from environment variables
        const payload = jwt.verify(jwtToken, process.env.jwtSecret);

        // Storing the payload (user information) in req.user for use in subsequent middleware or routes
        req.user = payload.user;

        // Calling the next middleware or route handler
        next();

    } catch (err) {
        // If the token is invalid or there's an error, return an error response
        return res.status(403).json("Not Authorized");
    }
};


```
</details>

<hr>

### <h3>Register.js</h3>

<details>
<summary>Click to expand code</summary>

```js

import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

const Register = ({setAuth}) => {

    // State to store form input values
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        name: ""
    });

    // Destructuring input values from state
    const {email, password, name} = inputs;

    // Function to update input values when user types in the form fields
    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value});
    };

    // Function to handle form submission
    const onSubmitForm =  async (e) => {
        e.preventDefault();

        try {
            // Prepare request body
            const body = {email, password, name};
            
            // Send POST request to register endpoint
            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });

            // Parse the response
            const parseRes = await response.json();

            // If registration is successful
            if(parseRes.token){
                // Store the token in localStorage
                localStorage.setItem("token", parseRes.token);

                // Set authentication status to true
                setAuth(true);
                
                // Display success toast message
                toast.success("Registered Successfully!");
            }else{
                // Set authentication status to false
                setAuth(false);
                
                // Display error toast message
                toast.error(parseRes);
            }

        } catch (err) {
            // Log error to console
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <h1 className="text-center my-5">Register</h1>
            {/* Register form */}
            <form onSubmit={onSubmitForm}>
                <input type="email" name="email" placeholder="Email" className="form-control my-3" value={email} onChange={e => onChange(e)}/>
                <input type="password" name="password" placeholder="Password" className="form-control my-3" value={password} onChange={e => onChange(e)}/>
                <input type="text" name="name" placeholder="Name" className="form-control my-3" value={name} onChange={e => onChange(e)}/>
                <button className="btn-success btn-block">Submit</button>
            </form>
            {/* Link to Login page */}
            <Link to="/login">Login</Link>
        </Fragment>
    );
};

export default Register;


```
</details>

<hr>

### <h3>Login.js</h3>

<details>
<summary>Click to expand code</summary>

```js

import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

const Login = ({setAuth}) => {

    // State to store form input values
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    // Destructuring input values from state
    const {email, password} = inputs;

    // Function to update input values when user types in the form fields
    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    };

    // Function to handle form submission
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            // Prepare request body
            const body = {email, password};
            
            // Send POST request to login endpoint
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            // Parse the response
            const parseRes = await response.json();

            // If login is successful
            if(parseRes.token){
                // Store the token in localStorage
                localStorage.setItem("token", parseRes.token);

                // Set authentication status to true
                setAuth(true);
                
                // Display success toast message
                toast.success("Logged in successfully!");
            }else{
                // Set authentication status to false
                setAuth(false);
                
                // Display error toast message
                toast.error(parseRes);
            }

        } catch (err) {
            // Log error to console
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            {/* Login title */}
            <h1 className="text-center my-5">Login</h1>
            {/* Login form */}
            <form onSubmit={onSubmitForm}>
                <input type="email" name="email" placeholder="Email" className="form-control my-3" value={email} onChange={e => onChange(e)}/>
                <input type="password" name="password" placeholder="Password" className="form-control my-3" value={password} onChange={e => onChange(e)}/>
                <button className="btn btn-success btn-block">Submit</button>
            </form>
            {/* Link to Register page */}
            <Link to="/register">Register</Link>
        </Fragment>
    );
};

export default Login;


```
</details>

<hr>

### <h3>(Client) Dashboard.js</h3>

<details>
<summary>Click to expand code</summary>

```js

import React, {Fragment, useState, useEffect} from "react";
import {toast} from "react-toastify";

const Dashboard = ({setAuth}) => {

    // State to store user name
    const [name, setName] = useState("");

    // Function to fetch user name from the server
    async function getName(){
        try {
            // Fetch user name from the server
            const response = await fetch("http://localhost:5000/dashboard/", {
                method : "GET",
                headers: {token: localStorage.token}
            });

            // Parse the response
            const parseRes = await response.json();

            // Set the user name in the state
            setName(parseRes.user_name);
        } catch (err) {
            // Log error to console
            console.error(err.message);
        }
    }

    // Function to handle logout
    const logout = (e) => {
        e.preventDefault();
        // Remove token from localStorage
        localStorage.removeItem("token");
        
        // Set authentication status to false
        setAuth(false);
        
        // Display logout success toast message
        toast.success("Logged out successfully!");
    };

    // useEffect to fetch user name when the component mounts
    useEffect(() =>{
        getName();
    }, []);

    return (
        <Fragment>
            {/* Dashboard title with user name */}
            <h1>Dashboard {name}</h1>
            {/* Logout button */}
            <button className="btn btn-primary" onClick={e => logout(e)}>Logout</button>
        </Fragment>
    );
};

export default Dashboard;


```
</details>

<hr>

### <h3>(Client) index.js</h3>

<details>
<summary>Click to expand code</summary>

```js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Creating a new React root with the root DOM element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the App component inside the React root
root.render(
  <React.StrictMode>  {/* Enabling React's strict mode */}
    <App />  {/* Rendering the App component */}
  </React.StrictMode>
);


```
</details>

<hr>




