import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";

const API_URL = "http://www.omdbapi.com?apikey=3410437d";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);


  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search || []);
    setFilteredMovies(data.Search || []);
  };

  const filterMovies = (filterType) => {
    if (filterType === movies) {
      setFilteredMovies(movies);
    } else if (filterType === 'before2005') {
      setFilteredMovies(movies.filter(movie => parseInt(movie.Year) < 2005));
    } else if (filterType === 'after2005') {
      setFilteredMovies(movies.filter(movie => parseInt(movie.Year) >= 2005));
    } else if (filterType === 'all') {
      setFilteredMovies(movies.filter(movie => parseInt(movie.Year) > 1880));
    }
  };

  return (
    <div className="app">
      <h1>Movies World</h1>
      <button className="btn btn-secondary button" onClick={() => filterMovies('before2005')}>Movies Before 2005</button>
      <button className="btn btn-secondary button" onClick={() => filterMovies('after2005')}>Movies After 2005</button>
      <button className="btn btn-info button" onClick={() => filterMovies('all')}>Show All</button>
      
      
      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {filteredMovies?.length > 0 ? (
        <div className="container">
          {filteredMovies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;