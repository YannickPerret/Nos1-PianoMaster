import React from 'react';

const Menu = () => {
    return (
        <nav className="navigation__mobile">
            <ul className="navigation__mobile__list">
                <li className="navigation__mobile__list__link">
                    <a href="/">
                        <img src="./images/home.svg" width="25" height="auto" />
                    </a>
                </li>
                <li className="navigation__mobile__list__link">
                    <a href="/users/partition.html">
                        <img src="./images/listPartition.svg" width="25" height="auto" />
                    </a>
                </li>
                <li className="navigation__mobile__list__link">
                    <a href="/search.html">
                        <img src="./images/search.svg" width="25" height="auto" />
                    </a>
                </li>
                <li className="navigation__mobile__list__link">
                    <a href="/user/index.html">
                        <img src="./images/utilisateur.svg" width="25" height="auto" />
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;