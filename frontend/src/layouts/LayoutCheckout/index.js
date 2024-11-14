import React from 'react';
import Image from '~/components/Image';
import images from '~/assets/images';
import './LayoutCheckout.scss';
import { Link, useParams } from 'react-router-dom';
const LayoutCheckout = ({ children }) => {
    const pathname = window.location.pathname;
    return (
        <div className="LayoutCheckout">
            <header className="LayoutCheckout__header">
                <div className="header-container">
                    <div className="logo d-flex align-items-center">
                        <Link to={'/'}>
                            <Image src={images.logoImage} style={{ height: 70, width: 70 }} />
                        </Link>
                        <span class="divider"></span>
                        <span class="title">{pathname === '/address' ? 'Địa chỉ giao hàng' : 'Thanh toán'}</span>
                    </div>
                </div>
            </header>
            <main className="main">
                <div className="main-content">{children}</div>
            </main>
        </div>
    );
};

export default LayoutCheckout;
