import React from 'react';

const SearchPartition = () => {
    return (
        <div className="searchSheet">
            <form>
                <input type="text" placeholder="Nom d'une partition...." />
                <button><img src="./images/search_bar.svg" width="30" height="auto"/></button>
            </form>
        </div>
    );
};

export default SearchPartition;