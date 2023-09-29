import React, { useState } from "react";
import styles from "./MovieSearch.module.css";

function MovieSearch({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);

  // Handle input change and debounce the onSearch function call
  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setSearchTerm(inputText);

    // Clear the previous timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout
    const newTypingTimeout = setTimeout(() => {
      // Call the onSearch function with the latest input text
      onSearch(inputText);
    }, 500); // Adjust the debounce delay as needed (e.g., 500 milliseconds)
    
    setTypingTimeout(newTypingTimeout);
  };

  return (
    <div className={styles.MovieSearch}>
      <input
        type="text"
        placeholder="Search for a movie..."
        onChange={handleInputChange}
        value={searchTerm}
      />
    </div>
  );
}

export default MovieSearch;
