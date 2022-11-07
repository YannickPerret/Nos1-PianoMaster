import React from 'react';
import { Link } from 'react-router-dom';

const SearchCards = (props) => {
    return (
        <Link to={'/musicSheet/'+props.search.id} className='card'>
            <div className='card__container'>
                <div className='card__container__title'>
                    <h3>{props.search.title}</h3>
                </div>
                <div className='card__container__body'>
                    <div className='card__container__body__col'>
                        <p>Parution le {props.search.date}</p>
                        <p>Auteur : {props.search.autor}</p>
                    </div>
                    <div className='card__container__body__col'>
                        <p>&nbsp;</p>
                        <p>Nbe de vues : + 155k</p>
                    </div>
                </div>
            </div>
            <div className='card__discover'>
                <Link to={'/musicSheet/'+props.search.id}>Découvrir la partition</Link>
            </div>
        </Link>
    );
};

export default SearchCards;