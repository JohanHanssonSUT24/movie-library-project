import React, { useState, useEffect, useCallback } from 'react';
import SearchField from './components/SearchField';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import FavoritesList from './components/FavoritesList';
import TutorialView from './components/TutorialView';

const API_Key = import.meta.env.VITE_OMDB_API_KEY;

function App() {
  const [movies, setMovies] = useState([]); 
  const [selectedMovie, setSelectedMovie] = useState(null); 
  const [searchTerm, setSearchTerm] = useState('star wars'); 
  const [view, setView] = useState('search'); 
  
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('omdb-favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('omdb-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const searchMovies = useCallback(async (query) => {
    if (!query) return;
    setSearchTerm(query);
    setSelectedMovie(null);
    setView('search');

    try {
      const url = `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        console.error(data.Error);
      }
    } catch (error) {
      console.error("Fel vid filmsökning:", error);
    }
  }, []);

  const fetchMovieDetails = useCallback(async (id) => {
    setSelectedMovie(null); 

    try {
      const url = `https://www.omdbapi.com/?i=${id}&plot=full&apikey=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.Response === "True") {
        setSelectedMovie(data);
        setView('details');
      } else {
        console.error(data.Error);
      }
    } catch (error) {
      console.error("Fel vid hämtning av filmdetaljer:", error);
    }
  }, []);

  useEffect(() => {
    searchMovies(searchTerm);
  }, [searchTerm, searchMovies]);


  const toggleFavorite = (movie) => {
    const isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);

    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  const renderView = () => {
    if (view === 'details' && selectedMovie) {
      return (
        <MovieDetails 
          movie={selectedMovie} 
          onToggleFavorite={toggleFavorite}
          isFavorite={favorites.some(fav => fav.imdbID === selectedMovie.imdbID)}
        />
      );
    } 
    
    if (view === 'favorites') {
      return (
        <FavoritesList 
          favorites={favorites} 
          onMovieSelect={fetchMovieDetails}
          onToggleFavorite={toggleFavorite}
        />
      );
    }

    if (view === 'tutorial') {
      return <TutorialView onMovieSelect={fetchMovieDetails} />;
    }
    
    return (
      <MovieList 
        movies={movies} 
        onMovieSelect={fetchMovieDetails}
      />
    );
  };

  return (
    <div className="app-container">
      <header>
        <h1>Filmkomponentbibliotek</h1>
        {/* Sökkomponent - skickar searchMovies som PROPS */}
        <SearchField onSearch={searchMovies} initialSearch={searchTerm} />
        
        {/* Enkel navigation */}
        <nav>
          <button onClick={() => setView('search')}>Sök Resultat</button>
          <button onClick={() => setView('favorites')}>Mina Favoriter ({favorites.length})</button>
          <button onClick={() => setView('tutorial')}>Tutorial</button>
        </nav>
      </header>

      <main>
        {renderView()}
      </main>
      
      <footer>
        <p>OMDb API-projekt av en nybörjare!</p>
      </footer>
    </div>
  );
}

export default App;
