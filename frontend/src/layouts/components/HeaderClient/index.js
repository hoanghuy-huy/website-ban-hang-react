import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import './HeaderClient.scss';
import SearchBox from '../SearchBox';
import { Link, NavLink } from 'react-router-dom';
import routes from '~/config/routes';
import config from '~/config';
import AccountActions from './AccountAction';
import { showLoginForm } from '~/redux/features/accountSlice';
import AuthForm from './AuthForm';
const HeaderClient = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.account.auth);
    const handleShowLoginForm = () => {
        dispatch(showLoginForm('cart'));
    };
    const cartItem = useSelector((state) => state.cart.cartList)

    return (
        <header className="container-header">
            <div className="inner-header col-12 gap-5">
                <div className="logo col-2 ps-4">
                    <Link to={routes.home}>
                        {/* <img
                            src="https://salt.tikicdn.com/ts/upload/0e/07/78/ee828743c9afa9792cf20d75995e134e.png"
                            alt="logo"
                            width="96"
                            height="40"
                        /> */}
                        <h2 style={{fontWeight: 600,color: 'var(--primary-color)'}}>TIKI</h2>
                    </Link>
                </div>

                <SearchBox />

                <div className="actions col-3 gap-3">
                    <div className="action-home ">
                        <NavLink to={config.routes.home}>
                            {' '}
                            <FontAwesomeIcon className="icon icon-home pe-1 d-none d-sm-inline" icon={faHouse} />
                            <div className="d-none d-xxl-inline">Trang Chủ</div>
                        </NavLink>
                    </div>

                    <AccountActions />
                    {auth ? (
                        <Link to={'/cart'}>
                            <div className="icon cart-icon action-cart position-relative">
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                   {cartItem?.length}
                                </span>
                                <img
                                    src="https://salt.tikicdn.com/ts/upload/51/e2/92/8ca7e2cc5ede8c09e34d1beb50267f4f.png"
                                    alt="cart"
                                />
                            </div>
                        </Link>
                    ) : (
                        <div
                            className="icon cart-icon action-cart position-relative"
                            onClick={() => handleShowLoginForm()}
                        >
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                0
                            </span>
                            <img
                                src="https://salt.tikicdn.com/ts/upload/51/e2/92/8ca7e2cc5ede8c09e34d1beb50267f4f.png"
                                alt="cart"
                            />
                        </div>
                    )}
                </div>
                <AuthForm />
            </div>
        </header>
    );
};

export default HeaderClient;
