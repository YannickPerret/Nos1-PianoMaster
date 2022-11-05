import React, { useState } from 'react';
import Header from '../component/layout/header';
import Menu from '../component/layout/menu';
import SearchCards from '../component/search/searchCards';
import dataSheet from '../helpers/sheets.json';

const Search = () => {
    const [query, setQuery] = useState("");
    return (
        <>
            <Header />
            
            <main className='search'>
                    <h2 className='search__title'>Rechercher une partition</h2>
                    <input type={'text'} value={query} placeholder="Chercher un artiste, titre de musique,..." onChange={(e => setQuery(e.target.value))} />
                    <div className='search__body'>
                    {query ?
                        dataSheet.filter(post => {
                            if (query === '') {
                                return post;
                            } else if (post.title.toLowerCase().includes(query.toLowerCase())) {
                                return post;
                            }
                        }).map(element => {
                            return <SearchCards search={element} key={element.id} />
                        })
                    :null
                    }
                </div>
            </main>

            <Menu />

        </>
    );
};

export default Search;