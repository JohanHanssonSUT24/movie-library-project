import React from "react";
import '../styles/MovieCard.css';

function MovieCard({movie, onMovieSelect}){
    const posterUrl = movie.Poster === 'N/A'? 'https://via.placeholder.com/200x300?text=No+Picture' : movie.Poster;
    return (
        <div className="movie-card" onClick={() => onMovieSelect(movie.imdbID)}>
            <img src={posterUrl} alt={movie.Title}/>
            <div>
                <h4>{movie.Title}</h4>
                <p>{movie.Year}</p>
                <p>{movie.Type}</p>
            </div>
        </div>
    );
}
export default MovieCard;