import React, {useState} from "react";

function SearchField({onSearch, initialSearch}){
    const [query, setQuery] = useState(initialSearch);
    const handleSubmit = (e) => {
        e.preventDefault();
        if(query.trim()){
            onSearch(query.trim());
        }
    };
    return (
        <form onSubmit={handleSubmit} style={{margin: '20px o'}}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Sök film"
                style={{padding: '8px', marginRight: '10px'}}
            />
            <button type="submit" style={{padding: '8px 15px'}}>Sök</button>
        </form>
    );
}
export default SearchField;