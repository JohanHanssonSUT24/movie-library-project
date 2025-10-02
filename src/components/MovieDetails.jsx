import React from "react";
import '../styles/MovieDetails.css';

const renderStars = (rating) => {
    const numericRating = parseFloat(rating);
    const filledStars = Math.round(numericRating);
    const stars = [];

    for(let i = 1; i <= 10; i++){
        const isFilled = i <= filledStars;
        stars.push(
            <span key ={i} className={isFilled ? 'filled' : ''}>
               ★ 
            </span>
        );
    }
    return ( <span className="rating-stars">
        {stars}
    </span>);
}

function MovieDetails({movie, onToggleFavorite, isFavorite}){
    const posterUrl = movie.Poster === 'N/A'? 'https://via.placeholder.com/300x450?text=No+Picture' : movie.Poster;
    const buttonText = isFavorite ? 'Remove from favorites' : 'Add to favorites';
    const buttonClass = isFavorite ? 'remove-favorite' : 'add-favorite';
    const ratingExists = movie.imdbRating && movie.imdbRating !== 'N/A';
    return(
        <div className="movie-details">
            <img src={posterUrl} alt={movie.Title} className="detail-poster"/>
            <div className="details-info">
                <h2>{movie.Title} ({movie.Year})</h2>
                <button
                    onClick={() => onToggleFavorite(movie)}
                    className={`fav-button ${buttonClass}`}>
                    {buttonText}
                </button>
                <p><strong>Rating</strong> {ratingExists ? renderStars(movie.imdbRating) : 'Ej tillgängligt'}
                    {ratingExists ? ` (${movie.imdbRating}/10 baserat på ${movie.imdbVotes})` : ''}</p>
                <p><strong>Genre</strong> {movie.Genre}</p>
                <p><strong>Story-line</strong> {movie.Plot}</p>

            </div>
        </div>
    );
}
export default MovieDetails;