import React, { useState } from 'react';
import SearchCards from '../search/searchCards';
import dataSheet from '../../helpers/sheets.json';

const SearchPartition = () => {
    const [query, setQuery] = useState("");
    return (
        <div className="searchSheet">
            <h2 className="searchSheet__title">Rechercher une partition</h2>
            <div className="searchSheet__barInput">
                <input type="text" placeholder="Nom d'une partition...." value={query} onChange={(event) => setQuery(event.target.value)} />
                <button><img src="../images/search_bar.svg" width="30" height="auto"/></button>
            </div>
                
                {query ?
                <div className='searchSheet__result'>
                    {dataSheet.filter(post => {
                        if (query === '') {
                            return post;
                        } else if (post.title.toLowerCase().includes(query.toLowerCase())) {
                            return post;
                        }
                    }).map(element => {
                        return <SearchCards search={element} key={element.id} />
                    })}
                </div>:null
                }
        </div>
    );
};

export default SearchPartition;