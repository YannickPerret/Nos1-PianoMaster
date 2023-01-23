import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <nav className="navigation__mobile">
            <ul className="navigation__mobile__list">
                <li className="navigation__mobile__list__link">
                    <Link to="/">
                        <img src="../images/home.svg" width="25" height="auto" />
                    </Link>
                </li>
                <li className="navigation__mobile__list__link">
                    <Link to="/sheetComposer">
                        <img src="../images/piano.png" width="25" height="auto" />
                    </Link>
                </li>
                <li className="navigation__mobile__list__link">
                    <Link to="/search">
                        <img src="../images/search.svg" width="25" height="auto" />
                    </Link>
                </li>
                <li className="navigation__mobile__list__link">
                    <Link to="/users/1">
                        <img src="../images/utilisateur.svg" width="25" height="auto" />
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;