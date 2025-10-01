import React from "react";
import '../styles/MovieDetails.css';

function MovieDetails({movie, onToggleFavorite, isFavorite}){
    const posterUrl = movie.Poster === 'N/A'? 'https://via.placeholder.com/300x450?text=No´Picture' : movie.Poster;
    const buttonText = isFavorite ? 'Remove from favorites' : 'Add to favorites';
    return(
        <div className="movie-details">
            <img src={posterUrl} alt={movie.Title} className="detail-poster"/>
            <div className="details-info">
                <h2>{movie.Title} ({movie.Year})</h2>
                <button
                    onClick={() => onToggleFavorite(movie)}
                    className={`fav-button ${isFavorite ? 'favorited' : ''}`}>
                    {buttonText}
                </button>
                <p><strong>Rating</strong> {movie.imdbRating} ({movie.imdbVotes})</p>
                <p><strong>Genre</strong> {movie.Genre}</p>
                <p><strong>Story-line</strong> {movie.Plot}</p>

            </div>
        </div>
    );
}
export default MovieDetails;