import React from 'react';

const SheetCards = (props) => {
    return (
        <div className="sheetCards">
            <h3>{props.sheetCard.title}</h3>
            <ul>
                <li>Note : {props.sheetCard.note}/5</li>
                <li>Auteur : {props.sheetCard.autor}</li>
                <li>Genre : {props.sheetCard.genre}</li>
                <li>Date : {props.sheetCard.date}</li>
            </ul>
        </div>
    );
};

export default SheetCards;