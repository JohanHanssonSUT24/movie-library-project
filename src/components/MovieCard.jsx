import React from "react";
import '../styles/MovieCard.css';

function MovieCard({movie, onMovieSelect}){//Checks if stauts is N/A, if so, uses a placeholder. If not, uses real poster
    const posterUrl = movie.Poster === 'N/A'? 'https://via.placeholder.com/200x300?text=No+Picture' : movie.Poster;
    return (//OnClick to call onMovieSelect and gets the movies ID.
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