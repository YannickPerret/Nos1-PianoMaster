import React, { useState } from 'react';
import datasheet from '../../helpers/sheets.json';
import SearchCards from './searchCards';

const SearchInput = () => {
    const [query, setQuery] = useState("");

    return (
        
        [<input type={'text'} value={query} placeholder="Chercher un artiste, titre de musique,..." onChange={(e => setQuery(e.target.value))} />
        ,datasheet.filter(post => {
            if (query === '') {
                return post;
            } else if (post.title.toLowerCase().includes(query.toLowerCase())) {
                return post;
            }
        }).map(element => {
            if(element)
            return <SearchCards search={element} key={element.id} />
        })]
    ); 
};

export default SearchInput;