import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import routes from '~/config/routes';
import config from '~/config';
import AccountActions from './AccountAction';
import { showLoginForm } from '~/redux/features/accountSlice';
import AuthForm from './AuthForm';
import Image from '~/components/Image';
import images from '~/assets/images';
import SearchBox from '~/layouts/components/SearchBox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import './Header.scss';
import { Badge } from '@mui/material';
const Header = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.account.auth);
    const handleShowLoginForm = () => {
        dispatch(showLoginForm('cart'));
    };
    const cartItem = useSelector((state) => state.cart.cartList);

    return (
        <header className="header">
            <div className="inner-header col-12 gap-5">
                <div className="logo col-2 ps-4">
                    <Link to={routes.home}>
                        <Image src={images.logoImage} style={{ height: 70, width: 70 }} />
                    </Link>
                </div>

                <SearchBox />

                <div className="actions col-4 gap-3">
                    <div className="action-home ">
                        <NavLink to={config.routes.home}>
                            {' '}
                            <FontAwesomeIcon className="icon icon-home pe-1 d-none d-sm-inline" icon={faHouse} />
                            <div className="d-none d-xxl-inline">Trang Chủ</div>
                        </NavLink>
                    </div>
                    <div className="action-favorite">
                        <Badge badgeContent={4} color="primary">
                            <FavoriteBorder />
                        </Badge>
                        <div className="d-none d-xxl-inline ps-2">Yêu thích</div>
                    </div>

                    <AccountActions />
                    
                    {auth ? (
                        <Link to={'/cart'}>
                            <div className="icon cart-icon action-cart position-relative">
                                <Badge badgeContent={cartItem?.length} color="primary">
                                    <img
                                        src="https://salt.tikicdn.com/ts/upload/51/e2/92/8ca7e2cc5ede8c09e34d1beb50267f4f.png"
                                        alt="cart"
                                    />
                                </Badge>
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

export default Header;
