import React, {useState} from "react";
import '../styles/Shared.css';
//Component to handle searches for title, year or both
function SearchField({onSearch, initialSearch}){
    const [query, setQuery] = useState(initialSearch); //Stores searchterm Title
    const [year, setYear] = useState("");//Stores Year, saves as a string.

    const handleSubmit = (e) => {//Use of search-button/enter
        e.preventDefault();//Stops browser from re-loading
        //Validates that atleast one searchfield is filled out and sends it to onSearch
        if(query.trim() || year.trim()){
             onSearch(query, year);
        }
    };

    return (//Component returns HTML-structure for searchfield
        <form onSubmit={handleSubmit} className="search-form">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}//Updates state everytime user ads input.
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