
<h1 align="center">MyMovieList</h1>

<p align="center">
  <a href="https://www.youtube.com/watch?v=h8sp7vFeV7c"><img src="https://i.imgur.com/NpJRsFX.gif" alt="YouTube Demonstration" width="800"></a>
</p>

<h2>Description</h2>

<p>The goal of this project was to create a web application similar to MyAnimeList or Letterboxd, where user can have a profile filled with movie titles and their ratings for each title. I used datasets from Kaggle to populate a table in my database and used this database of available movies for the user to choose from and add to their respective list.</p>

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

<p>Download the files and save them on the same directory. Open the email_spam.ipynb file on a software such as Jupyter Notebook and Run All. Make sure to install in your machine all the necessary libraries. </p>

<p>
1. Problem Statement:
Email spam continues to be a significant issue, cluttering inboxes and potentially leading to security threats. The main challenge is to accurately distinguish between legitimate emails (ham) and unsolicited spam emails. Therefore, the objective is to build a machine learning model that can effectively classify emails based on their content.
</p>

<p>
2. Data Description:
The dataset used for this project consists of labeled email data with two classes: "spam" and "ham". Each email is represented as a text message. The dataset includes features such as the email message and its corresponding category (spam or ham).
</p>

<p align="center">
  <kbd><img src="https://i.imgur.com/LJ0Xsek.png" alt="PernTodo Website"></kbd>
</p>

<p>
3. Methodology

<p>
3.1 Data Preprocessing:
Missing values were handled by replacing them with empty strings.
Text data preprocessing involved converting text to lowercase, removing punctuation, and removing stop words using NLTK (Natural Language Toolkit).
The dataset was split into training and testing sets using a 80-20 split ratio.
</p>

<p align="center">
  <kbd><img src="https://i.imgur.com/QDnVz8S.png" alt="PernTodo Website"></kbd>
</p>

<p align="center">
  <kbd><img src="https://i.imgur.com/QjxdlXX.png" alt="PernTodo Website"></kbd>
</p>

<p align="center">
  <kbd><img src="https://i.imgur.com/0uyWOD8.png" alt="PernTodo Website"></kbd>
</p>


<p>
3.2 Model Training:
Text data was transformed into numerical features using TF-IDF (Term Frequency-Inverse Document Frequency) vectorization.
A logistic regression model was chosen for its simplicity and effectiveness in text classification tasks.
The model was trained using the training data, consisting of the TF-IDF transformed features and corresponding target labels.
</p>

<p align="center">
  <kbd><img src="https://i.imgur.com/rSJOWc7.png" alt="PernTodo Website"></kbd>
</p>

<p align="center">
  <kbd><img src="https://i.imgur.com/xdaWcPy.png" alt="PernTodo Website"></kbd>
</p>

<p>
3.3 Model Evaluation:
The trained model's performance was evaluated using various evaluation metrics, including accuracy, precision, recall, and F1-score.
Additionally, a confusion matrix was plotted using seaborn to visualize the model's performance in terms of true positives, false positives, true negatives, and false negatives.
</p>

<p align="center">
  <kbd><img src="https://i.imgur.com/9rn3zcn.png" alt="PernTodo Website"></kbd>
</p>


<p>
4. Results:
The logistic regression model achieved an accuracy of X% on the training data and Y% on the test data.
The classification report provided insights into the model's performance across different classes, including precision, recall, and F1-score.
The confusion matrix visualization helped to identify the model's strengths and weaknesses in classifying spam and ham emails.
</p>

<p align="center">
  <kbd><img src="https://i.imgur.com/oAWuB5S.png" alt="PernTodo Website"></kbd>
</p>

<p>
5. Future Considerations:
Hyperparameter tuning: Experiment with different hyperparameters of the logistic regression model to improve its performance further.
Feature engineering: Explore additional text preprocessing techniques and feature extraction methods to enhance the model's understanding of the email content.
Model deployment: Deploy the trained model as a service to classify emails in real-time and integrate it into existing email systems for practical use.
Continuous monitoring: Implement monitoring mechanisms to track the model's performance over time and adapt to changes in email patterns and spam tactics.
</p>

<p>
6. Conclusion:
In conclusion, the email classification system developed in this project demonstrates the effectiveness of machine learning in automating the classification of spam and ham emails. By preprocessing the text data, training a logistic regression model, and evaluating its performance using various metrics, we have created a reliable system for email classification. Further improvements and future considerations will continue to enhance the system's accuracy and usability in managing email communication.
</p>
