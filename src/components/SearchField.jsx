import React, {useState} from "react";
import '../styles/Shared.css';

function SearchField({onSearch, initialSearch}){
    const [query, setQuery] = useState(initialSearch);
    const [year, setYear] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Kontrollera att minst ett fält har innehåll, sedan skicka båda till onSearch
        if(query.trim() || year.trim()){
             onSearch(query, year);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Sök filmtitel"
            />
            <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="År (YYYY)"
            />

            <button type="submit" className="search-button">Sök</button>
        </form>
    );
}
export default SearchField;