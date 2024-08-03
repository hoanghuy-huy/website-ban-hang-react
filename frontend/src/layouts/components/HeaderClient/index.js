import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

import './HeaderClient.scss';
import SearchBox from '../SearchBox';
import { Link, NavLink } from 'react-router-dom';
import routes from '~/config/routes';
import config from '~/config';
import AccountActions from './AccountAction';

const HeaderClient = () => {
    return (
        <header className="container-header">
            <div className="inner-header col-12 gap-5">
                <div className="logo col-2 ps-4">
                    <Link to={routes.home}>
                        <img
                            src="https://salt.tikicdn.com/ts/upload/0e/07/78/ee828743c9afa9792cf20d75995e134e.png"
                            alt="logo"
                            width="96"
                            height="40"
                        />
                    </Link>
                </div>

                <SearchBox />

                <div className="actions col-3 gap-3">
                    <div className="action-home ">
                        <NavLink to={config.routes.home}>
                            {' '}
                            <FontAwesomeIcon className="icon icon-home pe-1 d-none d-sm-inline" icon={faHouse} />
                            <div className="d-none d-xxl-inline">Home Page</div>
                        </NavLink>
                    </div>

                    <AccountActions />

                    <div className="icon cart-icon action-cart position-relative">
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            9
                        </span>
                        <img
                            src="https://salt.tikicdn.com/ts/upload/51/e2/92/8ca7e2cc5ede8c09e34d1beb50267f4f.png"
                            alt="cart"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderClient;
