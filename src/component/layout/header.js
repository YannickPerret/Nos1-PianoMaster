import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div>
                <Link to={'/'}><img src="../images/logo_masterPiano_sans-text.png" width="100" height="auto" /></Link>
            </div>
            <div>
                <Link to={'/'}>PIANO MASTER</Link>
            </div>
        </header>
    );
};

export default Header;