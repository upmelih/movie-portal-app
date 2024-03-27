

import React, { useState } from 'react';
import axios from 'axios';

const MovieSearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  //const [genre, setGenre] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const apiKey = "4bae634eeaf48a761f9029a53f4e2ff9";

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`);
      setSearchResults(response.data.results);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
   
    <div>
      <input 
      type="text" 
      value={searchQuery} 
      onChange={(e) => setSearchQuery(e.target.value)} 
      className="bg-white/75 p-3 px-8 rounded-full outline-none lg:w-96 shadow-lg shadow-red-100 focus:shadow-red-200"
      />
      
      <button onClick={handleSearch}>Search</button>
     
      {error && <p>{error}</p>}

      {searchResults.map((movie) => (
        <div key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.release_date}</p>
          <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
        </div>
      ))}
    
    </div>
    
  );
};

export default MovieSearchComponent;
