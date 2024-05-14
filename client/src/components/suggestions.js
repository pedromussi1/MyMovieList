// suggestions.js
import React from 'react';

export const getSuggestions = async (value, setSuggestions) => {
  try {
    const response = await fetch(`http://localhost:5001/dashboard/movies/suggestions?query=${value}`, {
      method: 'GET',
      headers: { token: localStorage.token },
    });
    const data = await response.json();
    setSuggestions(data.slice(0, 5)); // Limit to first 5 suggestions
  } catch (err) {
    console.error(err.message);
  }
};

export const onChange = (event, { newValue }, setTitle, setSelectedSuggestion) => {
  setTitle(newValue);
  // Reset selected suggestion when user types
  setSelectedSuggestion(null);
};

export const onSuggestionsFetchRequested = async ({ value }, setSuggestions) => {
  await getSuggestions(value, setSuggestions);
};

export const onSuggestionsClearRequested = (setSuggestions) => {
  setSuggestions([]);
};

export const renderSuggestion = suggestion => (
  <div className="suggestion-item">
    {suggestion}
  </div>
);

export const getSuggestionValue = suggestion => suggestion;

export const getSuggestionsContainer = ({ containerProps, children }) => {
  return (
    <div {...containerProps} className="suggestions-container">
      {children}
    </div>
  );
};
