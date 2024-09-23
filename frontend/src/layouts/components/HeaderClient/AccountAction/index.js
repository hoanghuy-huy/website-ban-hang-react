import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { logoutAccount, showLoginForm } from '~/redux/features/accountSlice';
import { useDispatch, useSelector } from 'react-redux';

import './AccountAction.scss';
const AccountActions = (props) => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.account.auth);

    return (
        <>
            {auth ? (
                <>
                    <Tippy
                        interactive={true}
                        appendTo={document.body}
                        placement={'bottom-start'}
                        render={(attrs) => (
                            <div className="account-menu" tabIndex="-1" {...attrs}>
                                <PopperWrapper>
                                    <div className="account-menu__content py-2">
                                        <div className="account-menu__item py-1 ">Thông Tin Tài Khoản</div>
                                        <Link to={'/account/order'}>
                                            <div className="account-menu__item py-1">Đơn hàng của tôi</div>
                                        </Link>
                                        <div
                                            className="account-menu__item py-1"
                                            onClick={() => dispatch(logoutAccount())}
                                        >
                                            Đăng xuất
                                        </div>
                                    </div>
                                </PopperWrapper>
                            </div>
                        )}
                    >
                        <div className="action-user text-center">
                            <div onClick={() => dispatch(showLoginForm())}>
                                <FontAwesomeIcon className="icon user pe-1" icon={faUser} />
                                <span title="account" className="d-none d-xxl-inline">
                                    Xin Chào
                                </span>
                            </div>
                        </div>
                    </Tippy>
                </>
            ) : (
                <div className="action-user text-center">
                    <div onClick={() => dispatch(showLoginForm())}>
                        <FontAwesomeIcon className="icon user pe-1" icon={faUser} />
                        <span title="account" className="d-none d-xxl-inline">
                            Tài Khoản
                        </span>
                    </div>
                </div>
            )}
        </>
    );
};

export default AccountActions;
