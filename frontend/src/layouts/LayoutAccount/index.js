import React from 'react';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Header from '../MainLayout/Header';
import './LayoutAccount.scss';
import { Link, NavLink } from 'react-router-dom';

const LayoutAccount = ({ children }) => {
    return (
        <div className="LayoutAccount">
            <div className="LayoutAccount-container">
                <Header />
                <div className="container mt-4">
                    <main>
                        <div className="AccountPage">
                            <div className="AccountPage-container">
                                <aside className="AccountPage__sidebar">
                                    <div className="header-customer-account-page" style={{ display: 'flex', gap: 10 }}>
                                        <div className="avatar-account">
                                            <Image
                                                style={{ height: 45, width: 45, borderRadius: '50%' }}
                                                src="https://salt.tikicdn.com/cache/512x512/ts/avatar/db/40/84/abb45028401bfb8e035f36b41ac2da0e.jpg"
                                            />
                                        </div>
                                        <div className="info-account">
                                            Tài khoản của
                                            <strong
                                                style={{
                                                    fontSize: 16,
                                                    fontWeight: 400,
                                                    display: 'block',
                                                    margin: '0 0 12px',
                                                }}
                                            >
                                                Hoang Huy
                                            </strong>
                                        </div>
                                    </div>
                                    <ul className="account-actions">
                                        <li
                                            className="item-account gap-3"
                                            style={{
                                                height: 38,
                                                width: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                paddingLeft: 15,
                                            }}
                                        >
                                            <div>
                                                <FontAwesomeIcon
                                                    style={{
                                                        height: 20,
                                                        width: 20,
                                                        color: 'rgb(155, 155, 155)',
                                                    }}
                                                    icon={faUser}
                                                />
                                            </div>
                                            <div style={{ color: 'rgb(74, 74, 74)' }}>Thong Tin Tai Khoan</div>
                                        </li>
                                        <NavLink to={'/account/order'}>
                                            <li
                                                className="item-account gap-3"
                                                style={{
                                                    height: 38,
                                                    width: '100%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    paddingLeft: 15,
                                                }}
                                            >
                                                <div>
                                                    <FormatListBulletedOutlinedIcon
                                                        sx={{
                                                            height: 20,
                                                            width: 20,
                                                            color: 'rgb(155, 155, 155)',
                                                        }}
                                                        icon={faUser}
                                                    />
                                                </div>
                                                <div style={{ color: 'rgb(74, 74, 74)' }}>Quản lý đơn hàng</div>
                                            </li>
                                        </NavLink>
                                    </ul>
                                </aside>
                                <div className="AccountPage__content-inner">{children}</div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default LayoutAccount;
