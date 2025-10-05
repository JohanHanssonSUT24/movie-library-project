import React from "react";
import MovieCard from "./MovieCard";
import '../styles/Shared.css';

function FavoritesList({favorites, onMovieSelect}){
    if(favorites.length === 0){//If list is empty return message
        return <p className="no-results">There is no saved favorites.</p>;
    }
    return (
        <div>
            <h2>My favorites</h2>
            <div className="movie-list-container">
                {favorites.map(movie => (//Takes element "movie" and function onMovieSelect. If not empty it maps each movie in favorites array to component "MovieCard"
                    <MovieCard
                    key={movie.imdbID}
                    movie={movie}
                    onMovieSelect={onMovieSelect}//Makes each movie in list able to click to see more data.
                    />
                ))}
            </div>
        </div>
    );
}
export default FavoritesList;