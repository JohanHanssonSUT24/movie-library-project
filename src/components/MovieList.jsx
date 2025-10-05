import React from "react";
import MovieCard from "./MovieCard";
import '../styles/Shared.css';

//Shows a list of MovieCard for search result
function MovieList({movies, onMovieSelect}){
    if(movies.length === 0){
        return <p className="no-results">No movies found. Try another.</p>;
    }
    return(
        <div className="movie-list-container">
            {movies.map(movie => (
                <MovieCard
                key={movie.imdbID}
                movie={movie}
                onMovieSelect={onMovieSelect}
                />
            ))}
        </div>
    );
}

export default MovieList;