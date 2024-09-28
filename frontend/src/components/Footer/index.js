import React from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-container d-flex">
                    <div className="col-3">
                        <p className="title">
                            <strong>Tổng đài hỗ trợ</strong>
                        </p>
                        <p class="content">
                            <span>Gọi mua:</span> <Link> 1900 232 461</Link>
                            (8:00 - 21:30)
                        </p>
                        <p class="content">
                            <span>Gọi mua:</span> <Link> 1900 232 461</Link>
                            (8:00 - 21:30)
                        </p>
                        <p class="content">
                            <span>Gọi mua:</span> <Link> 1900 232 461</Link>
                            (8:00 - 21:30)
                        </p>
                    </div>

                    <div className="col-3">
                        <p className="title">
                            <strong>Về công ty</strong>
                        </p>
                        <p class="content">Giới thiệu công ty (MWG.vn)</p>
                        <p class="content">Giới thiệu công ty (MWG.vn)</p>
                        <p class="content">Giới thiệu công ty (MWG.vn)</p>
                    </div>
                    <div className="col-3">
                        <p className="title">
                            <strong>Thông tin khác</strong>
                        </p>
                        <p class="content">Tích điểm Quà tặng VIP</p>
                        <p class="content">Tích điểm Quà tặng VIP</p>
                        <p class="content">Tích điểm Quà tặng VIP</p>
                        <p class="content">Tích điểm Quà tặng VIP</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
