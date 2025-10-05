import React, {useState, useEffect, useCallback} from "react";
//Import Child-components
import SearchField from './components/SearchField'; 
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import FavoritesList from './components/FavoritesList';
import TutorialView from './components/TutorialView';
import './styles/App.css';

// Get API-key
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function App(){
  const [searchTerm, setSearchTerm] = useState('matrix'); // Default search term
  const [movies, setMovies] = useState([]); // Array of results
  const [selectedMovie, setSelectedMovie] = useState(null); // Movie details
  const [view, setView] = useState('search'); //Shows which page is showing, search/details/favorites or tutorial
  const [favorites, setFavorites] = useState(() => { 
  const savedFavorites = localStorage.getItem('omdb-favorites'); //Saved favorite movies
    return savedFavorites ? JSON.parse(savedFavorites) : []; //Favorites are saved in LS, using JSON.parse to convert JSON to JS-object/array
  });

  useEffect(() => { 
    localStorage.setItem('omdb-favorites', JSON.stringify(favorites)); //Sync favorites to LS everytime list changes.
   }, [favorites]);



const searchMovies = useCallback(async (query, year) => { 
    const trimmedQuery = query ? query.trim() : '';//Use trim on search-input to clear from white spaces.

    const trimmedYear = (year && /^\d{4}$/.test(year.trim())) ? year.trim() : '';//Check if Year-input is a valid 4-dig input.


    if (!trimmedQuery && !trimmedYear) {//If both searchfields are empty, cancel function.
        setMovies([]); //Clears result-list
        setView('search');//Set UI to search
        return;
    }


    let finalQuery = trimmedQuery;//If search only includes year, "movie" is added as default-search for title to meet OMDb requirements.
    if (!finalQuery && trimmedYear) {

        finalQuery = 'movie'; 
    }

    setSearchTerm(finalQuery);//update search
    setSelectedMovie(null);//Previous search set as null
    setView('search');//Set result of new serach

    try {//Creates search inputs ("s=search") with final search term and API_KEY for authentication.
        const params = new URLSearchParams({ s: finalQuery, apikey: API_KEY }); 

        if (trimmedYear) {//If year is added, includes in the search result.
          params.set('y', trimmedYear); 
        }

        const response = await fetch(`https://www.omdbapi.com/?${params.toString()}`); 
        const data = await response.json();

        if (data.Response === "True") {//If response is True

            const uniqueMovies = data.Search.filter((movie, index, self) =>//Results are filtered to remove duplicates based on ID
                index === self.findIndex((m) => (
                m.imdbID === movie.imdbID
              ))
          );
            setMovies(uniqueMovies);//Result of unique movies
        } else {
          setMovies([]);//If response is False then the list will be empty
          console.error(data.Error);
        }
    } catch (error) {//Catch if failed request
        console.error("Error fetching data:", error);
        setMovies([]);
    }
}, [API_KEY]); //Ends useCallback. Creates new array ONLY if the content has changed.


  const fetchMovieDetails = useCallback(async (id) => {//Function takes "id" as an arugment
    setSelectedMovie(null);//Sets previus movie-details to null
    try{

      const url = `https://www.omdbapi.com/?i=${id}&plot=full&apikey=${API_KEY}`; //Uses id to get specific title. Uses plot to get description of that title. Authenticate with API_KEY
      const response = await fetch(url);
      const data = await response.json();

      if(data.Response === "True"){//If response is True, saves movie-details
        setSelectedMovie(data);
        setView('details');//UI changes to "details" and shows information.
      }else {
        console.error(data.Error);
      }
    }catch (error){
      console.error("Unexpected error occured:", error);
  } 
  }, [API_KEY]); //Ends useCallback. Creates new array ONLY if the content has changed.

  useEffect(() => { //Initial search when application starts to show initial movies

    searchMovies(searchTerm, ''); 

  }, []); 

  const toggleFavorite = (movie) => {//Handles favorite-movies
    const isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);//Check if movie already is a favorite
    if(isFavorite){
      setFavorites(favorites.filter(fav => fav.imdbID !== movie.imdbID));//If already a favorite, uses Filter to create a new list without that movie.
    } else {
      setFavorites([...favorites, movie]);//If not a favorite, uses ...-operator to create a new array with old favorites and added one.
    }
  };

  const renderView = () => {//Logic for UI-view to determine what to show user based on present view.
    if(view === 'details' && selectedMovie){//If details and movie is chosen, show component "MovieDetails"
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
        <h1>Hasses fina filmer!</h1>
        {/* Skicka med den uppdaterade searchMovies-funktionen */}
        <SearchField onSearch={searchMovies} initialSearch={searchTerm} />
        <nav>
          {/* Ändrade "overview" till "search" för tydlighet i navigationen */}
          <button onClick={() => setView('search')}>Sökresultat</button>
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