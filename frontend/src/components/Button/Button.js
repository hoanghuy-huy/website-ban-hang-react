import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './Button.module.scss';

const cx = classNames.bind(style);
const Button = ({ children, to, href, onClick, primary = false, rounded = false, small = false, outline= false, normal = false, active = false, medium = false ,...passProps }) => {
    let Component = 'button';

    const props = {
        onClick,
        ...passProps,
    };

    if (to) {
        props.to = to;
        Component = Link;
    } else if (href) {
        props.href = href;
        Component = 'a';
    }

    const classes = cx('wrapper-button', {
        primary,
        rounded,
        small,
        outline,
        normal,
        active,
        medium
    });
    return (
        <Component className={classes} {...props}>
            <span>{children}</span>
        </Component>
    );
};

export default Button;
