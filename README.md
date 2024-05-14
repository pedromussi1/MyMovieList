
<h1 align="center">MyMovieList</h1>

<p align="center">
  <a href="https://www.youtube.com/watch?v=h8sp7vFeV7c"><img src="https://i.imgur.com/NpJRsFX.gif" alt="YouTube Demonstration" width="800"></a>
</p>

<h2>Description</h2>

<p>The goal of this project was to create a web application similar to MyAnimeList or Letterboxd, where user can have a profile filled with movie titles and their ratings for each title. This project takes my experience from 'PernTodo' and 'JWT with PERN' and moves to a whole new level by combining their features and adding many more on top of it. I used datasets from Kaggle to populate a table in my database and used this database of available movies for the user to choose from and add to their respective list. I also added react-suggestion to create the drop-down list logic that is used on the application.</p>

<h2>Languages and Utilities Used</h2>

<ul>
  <li><b>PostgreSQL</b></li>
  <li><b>Express.js</b></li>
  <li><b>React</b></li>
  <li><b>Node.js</b></li>
  <li><b>Kaggle</b></li>
</ul>

<h2>Environments Used</h2>

<ul>
  <li><b>Windows 11</b></li>
  <li><b>Visual Studio Code</b></li>
</ul>


<h2>Project Walk-through</h2>

<p>Download files, install npm and nodemon before running. Import all necessary libraries. Run 'nodemon server' inside server folder, and run 'npm start' inside client folder.</p>

<h3>Login Page</h3>

<p align="center">
  <kbd><img src="https://i.imgur.com/9p4H4wO.png?1" alt="Login"></kbd>
</p>

<p>The login page works the same way as the one that was used for 'JWT with PERN'. The user can write their email and password credentials in order to log into the website. The user will only be able to log into an account that has already been registered on the website.</p>

<h3>Registering new User on the Website</h3>

<p align="center">
  <kbd><img src="https://i.imgur.com/RhRDuUr.png?1" alt="DeletingItem"></kbd>
</p>

<p>The user here can register a new account on the website by providing email, password and username credentials. After registering, the user will access their dashboard that displays their username.</p>

<h3>Adding movie title</h3>

<p align="center">
  <kbd><img src="https://i.imgur.com/0n9B35x.png" alt="AddingMovie"></kbd>
</p>

<p>After logging in the user will see this page, where they can add movie titles to their list and give a rating to each one.</p>

<p align="center">
  <kbd><img src="https://i.imgur.com/NpJRsFX.gif" alt="DeletingItem" width="1000"></kbd>
</p>

<p>By typing the title of a movie in the input field, a drop-down list of movies will be shown. The user can select of the the shown titles, type a rating, and add the movie to the list. If a movie is not selected from the drop-down, the user cannot add it to the list.</p>
<p>The 'Edit' button provides a chance for the user to changetheir rating for a movie they have previously added to the list. After pressing 'Save' the rating will be updated. THe user can also press 'Delete' if they want to remove an item from the list.</p>

<h3>Different Users</h3>

<p align="center">
  <kbd><img src="https://i.imgur.com/7lvQk5H.png" alt="AddingMovie"></kbd>
</p>

<p>In case you decide to have two different accounts, you will notice that they do not share the same list. Each user has their own list and all the rules of the list such as no two entries can have the same name are applicable for each user account.</p>

<p align="center">
  <kbd><img src="https://i.imgur.com/emqUmc0.png" alt="AddingMovie"></kbd>
</p>
