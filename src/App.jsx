import React, {useState, useEffect, useCallback} from "react";
import SearchField from './components/SearchField';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import FavoritesList from './components/FavoritesList';
import TutorialView from './components/TutorialView';
import './styles/App.css';

// Get API-key
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function App(){
  const [searchTerm, setSearchTerm] = useState('gladiator'); // Default search term
  const [movies, setMovies] = useState([]); // Array of results
  const [selectedMovie, setSelectedMovie] = useState(null); // Movie details
  const [view, setView] = useState('search');
  
  // UseState for favorite list (array) from local storage and to save to local storage.
  const [favorites, setFavorites] = useState(() => { 
    const savedFavorites = localStorage.getItem('omdb-favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  
  useEffect(() => { 
    localStorage.setItem('omdb-favorites', JSON.stringify(favorites));
  }, [favorites]);


  // Search function
  const searchMovies = useCallback(async (query) => {
    if (!query) return;
    setSearchTerm(query);
    setSelectedMovie(null);
    setView('search');
    try{
      const url = `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      if(data.Response === "True") {
        const uniqueMovies = [];
        const ids = new Set();

        data.Search.forEach(movie =>{
          if( !ids.has(movie.imdbID)){
            uniqueMovies.push(movie);
            ids.add(movie.imdbID);
          }
        });
        setMovies(uniqueMovies);
      } else{
        setMovies([]);
        console.error(data.Error);
      }
    } catch (error){
      console.error("Error fetching data:", error);
    }
  }, []);

  // Hämta filmdetaljer
  const fetchMovieDetails = useCallback(async (id) => {
    setSelectedMovie(null);
    try{
      // KORRIGERAD URL: Använder 'i=' för ID och variabeln 'id'
      const url = `https://www.omdbapi.com/?i=${id}&plot=full&apikey=${API_KEY}`; 
      const response = await fetch(url);
      const data = await response.json();
      
      if(data.Response === "True"){
        // KORRIGERAT: Byt till setSelectedMovie
        setSelectedMovie(data);
        setView('details');
      }else {
        console.error(data.Error);
      }
    }catch (error){
      console.error("Unexpected error occured:", error);
    }
  }, []);
  
  // Initial sökning vid laddning
  useEffect(() => {
    searchMovies(searchTerm);
  }, [searchTerm, searchMovies]);
  
  // Favorite functions
  const toggleFavorite = (movie) => {
    const isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);
    if(isFavorite){
      setFavorites(favorites.filter(fav => fav.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
  };
  
  // Render view
  const renderView = () => {
    if(view === 'details' && selectedMovie){
      return(
        <MovieDetails
          movie={selectedMovie}
          onToggleFavorite={toggleFavorite}
          isFavorite={favorites.some(fav => fav.imdbID === selectedMovie.imdbID)}
        />
      );
    }
    if(view === 'favorites'){
      return(
        <FavoritesList
          favorites={favorites}
          onMovieSelect={fetchMovieDetails}
        />
      );
    }
    if(view === 'tutorial'){
      return <TutorialView onMovieSelect={fetchMovieDetails} />;
    }
    return(
      <MovieList
        movies={movies}
        onMovieSelect={fetchMovieDetails}
      />
    );
  };
  
  return (
    <div className="app-container">
      <header>
        <h1>Moviecomponentslibrary</h1>
        <SearchField onSearch={searchMovies} initialSearch={searchTerm} />
        <nav>
          <button onClick={() => setView('search')}>Sök</button>
          <button onClick={() => setView('favorites')}>Favoriter ({favorites.length})</button>
          <button onClick={() => setView('tutorial')}>Tutorial</button>
        </nav>
      </header>
      <main>
        {renderView()}
      </main>
      <footer>
        <p>Hasses filmdatabas!</p>
      </footer>
    </div>
  );
}

export default App;