import React, {useState} from "react";
import '../styles/Shared.css';

function SearchField({onSearch, initialSearch}){
    const [query, setQuery] = useState(initialSearch);
    const handleSubmit = (e) => {
        e.preventDefault();
        if(query.trim()){
            onSearch(query.trim());
        }
    };
    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Sök film"
            />
            <button type="submit" className="search-button">Sök</button>
        </form>
    );
}
export default SearchField;