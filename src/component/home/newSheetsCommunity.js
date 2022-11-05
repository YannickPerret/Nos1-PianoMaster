import React, { useEffect, useState } from 'react';
import SheetCards from '../sheets/sheetCards';

const NewSheetsCommunity = (props) => {
    return (
        <div className="newCommunitySheet">
            <h2 className="newCommunitySheet__title">Partitions de la communauté</h2>
            <div className="newCommunitySheet__list">
                {props.data.map(element => {
                    return(
                        <SheetCards sheetCard={element} key={element.id}/>
                    )
                })}
            </div>
        </div>
    );
};

export default NewSheetsCommunity;