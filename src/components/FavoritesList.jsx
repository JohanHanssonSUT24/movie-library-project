import React from "react";
import MovieCard from "./MovieCard";
import '../styles/Shared.css';

function FavoritesList({favorites, onMovieSelect}){
    if(favorites.length === 0){
        return <p className="no-results">There is no saved favorites.</p>;
    }
    return (
        <div>
            <h2>My favorites</h2>
            <div className="movie-list-container">
                {favorites.map(movie => (
                    <MovieCard
                    key={movie.imdbID}
                    movie={movie}
                    onMovieSelect={onMovieSelect}
                    />
                ))}
            </div>
        </div>
    );
}
export default FavoritesList;