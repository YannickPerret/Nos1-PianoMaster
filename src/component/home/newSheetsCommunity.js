import React, { useEffect, useState } from 'react';

const NewSheetsCommunity = (props) => {
    return (
        <div className="newCommunitySheet">
            <h2 className="newCommunitySheet__title">Partitions de la communauté</h2>
            <div className="newCommunitySheet__cols">
                {props.data.map(element => {
                    return(
                    <div className="newCommunitySheet__row">
                        <h3>{element.title}</h3>
                        <ul>
                            <li>Note : {element.note}/5</li>
                            <li>Autor : {element.autor}</li>
                            <li>Genre : {element.genre}</li>
                            <li>Date : {element.date}</li>
                        </ul>
                    </div>)
                })}
            </div>
        </div>
    );
};

export default NewSheetsCommunity;