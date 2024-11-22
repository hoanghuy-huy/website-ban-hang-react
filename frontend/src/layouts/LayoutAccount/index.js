import React from 'react';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Header from '../MainLayout/Header';
import { Link, NavLink } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import './LayoutAccount.scss';
import { ROLE_MANAGER } from '~/utils/constants';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
const LayoutAccount = ({ children }) => {
    const role = useSelector((state) => state.account.account.userGroup);

    return (
        <div className="LayoutAccount">
            <div className="LayoutAccount-container">
                <Header />
                <div className="container mt-4">
                    <main>
                        <div className="AccountPage">
                            <div className="AccountPage-container">
                                <aside className="AccountPage__sidebar">
                                    {/* <div className="header-customer-account-page" style={{ display: 'flex', gap: 10 }}>
                                        <div className="avatar-account">

                                            <Avatar />
                                        </div>
                                        <div className="info-account">
                                            Tài khoản của
                                            <strong
                                                style={{
                                                    fontSize: 16,
                                                    fontWeight: 400,
                                                    display: 'block',
                                                    margin: '0 0 12px',
                                                    textTransform: 'uppercase',
                                                }}
                                            >
                                                {role}
                                            </strong>
                                        </div>
                                    </div> */}
                                    <ul className="account-actions">
                                        {role === ROLE_MANAGER ? (
                                            <>
                                                {' '}
                                                <NavLink to={'/admin/order'}>
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
                                            </>
                                        ) : (
                                            <>
                                                <NavLink to={'/account/info'}>
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
                                                            <PersonIcon
                                                                sx={{
                                                                    height: 20,
                                                                    width: 20,
                                                                    color: 'rgb(155, 155, 155)',
                                                                }}
                                                                icon={faUser}
                                                            />
                                                        </div>
                                                        <div style={{ color: 'rgb(74, 74, 74)' }}>
                                                            Thông tin người dùng
                                                        </div>
                                                    </li>
                                                </NavLink>
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

                                                <NavLink to={'/account/return-order'}>
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
                                                            <AssignmentReturnIcon
                                                                sx={{
                                                                    height: 20,
                                                                    width: 20,
                                                                    color: 'rgb(155, 155, 155)',
                                                                }}
                                                                icon={faUser}
                                                            />
                                                        </div>
                                                        <div style={{ color: 'rgb(74, 74, 74)' }}>Quản lý trả hàng</div>
                                                    </li>
                                                </NavLink>
                                            </>
                                        )}
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
