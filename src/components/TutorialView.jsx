import React from "react";
import MovieCard from "./MovieCard";
import SearchField from "./SearchField";
import '../styles/TutorialView.css'

const dummyMovie = {
    Title: "Dummy movie",
    Year: "20XX",
    imdbID: "tt1234567",
    Type: "Movie",
    Poster: "https://via.placeholder.com/200x300?text=MovieCard+Example"
};
function TutorialView({ onMovieSelect}){
    const dummySearch = (query) => {
        alert(`Search initiated with: ${query}`);
        
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
        </div>
    );
}
export default TutorialView;