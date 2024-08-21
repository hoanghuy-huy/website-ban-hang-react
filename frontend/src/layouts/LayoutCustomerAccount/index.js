import React from 'react';
import Image from '~/components/Image';
import './LayoutCustomerAccount.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import HeaderClient from '../components/HeaderClient';

const LayoutCustomerAccount = ({children}) => {
    return (
        <div className="layout-customer-account-container">
            <HeaderClient />
            <div className="customer-account-page pt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-3 ">
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
                                        style={{ fontSize: 16, fontWeight: 400, display: 'block', margin: '0 0 12px' }}
                                    >
                                        Hoang Huy
                                    </strong>
                                </div>
                            </div>
                            <ul className="account-actions">
                                <li
                                    className="item-account"
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
                                                height: 16,
                                                width: 16,
                                                color: 'rgb(155, 155, 155)',
                                            }}
                                            icon={faUser}
                                        />
                                    </div>
                                    <div style={{ color: 'rgb(74, 74, 74)' }}>Thong Tin Tai Khoan</div>
                                </li>
                            </ul>
                        </div>
                        <div className="col-9">
                            <div
                                className="col-12"
                                style={{ fontSize: 20, lineHeight: '32px', fontWeight: 400, margin: '4px 0 12px' }}
                            >
                                Thong Tin Tai Khoan
                            </div>
                            <div
                                className="col-12"
                                style={{ minHeight: '100vh', background: 'var(--white)', borderRadius: 6 }}
                            >
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LayoutCustomerAccount;
