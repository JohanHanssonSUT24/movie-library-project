import React from "react";
import MovieCard from "./MovieCard";
import SearchField from "./SearchField";
import '../styles/TutorialView.css'
import MovieList from "./MovieList";
import MovieDetails from "./MovieDetails";

const dummyMovie = {
    Title: "Dummy movie",
    Year: "20XX",
    imdbID: "tt1234567",
    Type: "Movie",
    Poster: "https://via.placeholder.com/200x300?text=MovieCard+Example"
};
const dummyList = [
    dummyMovie,
    {
        ...dummyMovie,
        Title: "Second dummy movie",
        imdbID: "tt1234568"
    }
];
function TutorialView({ onMovieSelect}){
    const dummySearch = (query) => {
        alert(`Search initiated with: ${query}`);
        
    };

    const dummyToggle = () =>{
        alert("Toggle favorite clicked!")
    };
    return(
        <div className="tutorial-view">
            <h2>Library tutorial</h2>

            <div className="tutorial-section">
                <h3>1. SearchField</h3>
                <p>Accepts <code>onSearch</code> prop to handle search logic in parent-component(App.jsx)</p>
                <h4>Rendering:</h4>
                <SearchField onSearch={dummySearch} initialSearch={"text"}/>
                <h4>Example: </h4>
                <pre className="code-example"><code>{`
                <SearchField onSearch={handleSearchFunction}/>
                `}</code></pre>
            </div>
            <div className="tutorial-section">
                <h3>2. MovieCard</h3>
                <p>Shows info. Accepts <code>movie</code> (object) and <code>onMovieSelect</code>(function) via props.</p>
                <h4>Rendering:</h4>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <MovieCard movie={dummyMovie} onMovieSelect={onMovieSelect}/>
                </div>
                <h4>Example:</h4>
                <pre className="code-example">
                    <code>{`
                    const filmData = {Title: "...", Year: "..." };
                    <MovieCard
                    movie={filmData}
                    onMovieSelect={fetchDetailsFunction}
                    />
                    `}</code>
                </pre>
            </div>
            <div className="tutorial-section">
                <h3>3. MovieList</h3>
                <p>Renders a list of <code>MovieCard</code> components based on prop-value <code>movies</code> (array)</p>
                <p>Sending <code>onMovieSelect</code> to each card.</p>
                <h4>Rendering:</h4>
                <div style={{border: '1px dashed #aaa', padding: '10px', maxWidth: '600px', margin: '15px auto'}}>
                    <MovieList movies={dummyList} onMovieSelect={onMovieSelect}/>
                </div>
                <h4>Example:</h4>
                <pre className="code-example">
                    <code>{`
                    const searchResults = [{..movie1}, {..movie2}];
                    <MovieList
                    movies={searchResults}
                    onMovieSelect={handleDetailsClick}
                    />
                    `}</code>
                </pre>
            </div>
            <div className="tutorial-section">
                <h3>4. MovieDetails</h3>
                <p>Shows complete information about a choosen movie. Accepts <code>movie</code>(object), <code>onToggleFavorite</code> (function) and <code>isFavorite</code> (boolean).</p>
                <h4>Rendering:</h4>
                <div style={{border: '1px dashed #aaa', padding: '10px', margin: '15px auto'}}>
                    <MovieDetails
                    movie={dummyMovie}
                    onToggleFavorite={dummyToggle}
                    isFavorite={true}/>
                </div>
                <h4>Example:</h4>
                <pre className="code-example">
                    <code>{`
                    <MovieDetails
                    movie={selectedMovie}
                    onToggleFavorite={toggleFavFunc}
                    isFavorite={true}
                    />
                    `}</code>
                </pre>
            </div>
        </div>
    );
}
export default TutorialView;