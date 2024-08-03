import React from 'react';
import  './Menu.scss';
import {  NavLink } from 'react-router-dom';
import config from '~/config';

const MenuItem = ({ item, className, onClick, ...passProps }) => {

    return (
        <NavLink to={config.routes.product + item.path}  className={className} onClick={onClick} {...passProps}>
            <div className='title'>{item.name}</div>
        </NavLink>
    );
};



export default MenuItem;
