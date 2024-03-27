import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [movieDetailsData, setMovieDetailsData] = useState(null);

  const navigate = useNavigate();
  const apiKey = "4bae634eeaf48a761f9029a53f4e2ff9";

  async function handleSearch(event) {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&with_genres=${genre}`
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        genre,
        setGenre,
        searchResults,
        setSearchResults,

        handleSearch,
        movieDetailsData,
        setMovieDetailsData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
