import React from 'react';
import { Link } from 'react-router-dom';

const SearchCards = (props) => {
    return (
        <Link to={'/musicSheet/'+props.search.id} className='card'>
            <div className='card__title'>
                <h3>{props.search.title}</h3>
            </div>
            <div className='card__body'>
                <p>Auteur : {props.search.autor}</p>
                <p>Date : {props.search.date}</p>
            </div>
        </Link>
    );
};

export default SearchCards;