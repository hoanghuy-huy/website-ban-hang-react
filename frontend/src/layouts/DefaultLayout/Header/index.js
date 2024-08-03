import React from 'react';
import './Header.scss';
import NavHeader from '~/components/NavHeader';


const Header = () => {
    return (
        <div className="header mb-4">
            <NavHeader />
        </div>
    );
};

export default Header;
