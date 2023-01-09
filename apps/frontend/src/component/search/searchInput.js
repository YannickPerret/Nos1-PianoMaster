import React, { useState, useMemo } from 'react';
import datasheet from '../../helpers/sheets.json';
import SearchCards from './searchCards';

const SearchInput = () => {
    const [query, setQuery] = useState("");

    // Utilisez la fonction useMemo pour mémoriser le résultat du filtre
    const filteredData = useMemo(() => {
        return datasheet.filter(post => {
            if (query === '') {
                return post;
            } else if (post.title.toLowerCase().includes(query.toLowerCase())) {
                return post;
            }
        });
    }, [query, datasheet]);

    return (
        <>
            <input
                type="text"
                value={query}
                placeholder="Chercher un artiste, titre de musique,..."
                onChange={e => setQuery(e.target.value)}
            />
            {filteredData.map(element => {
                if (element) return <SearchCards search={element} key={element.id} />;
            })}
        </>
    );
};

export default SearchInput;
