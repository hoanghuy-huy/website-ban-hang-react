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
                        <p className="content">
                            <span>Gọi mua:</span> <Link to="#">1900 232 461</Link> (8:00 - 21:30)
                        </p>
                        <p className="content">
                            <span>Hỗ trợ kỹ thuật:</span> <Link to="#">1900 232 462</Link> (8:00 - 21:30)
                        </p>
                        <p className="content">
                            <span>Phản hồi chất lượng:</span> <Link to="#">1900 232 463</Link> (8:00 - 21:30)
                        </p>
                    </div>

                    <div className="col-3">
                        <p className="title">
                            <strong>Về công ty</strong>
                        </p>
                        <p className="content">Giới thiệu công ty</p>
                        <p className="content">Chính sách bảo mật</p>
                        <p className="content">Điều khoản sử dụng</p>
                    </div>
                    <div className="col-3">
                        <p className="title">
                            <strong>Thông tin khác</strong>
                        </p>
                        <p className="content">Tích điểm Quà tặng VIP</p>
                        <p className="content">Chương trình khuyến mãi</p>
                        <p className="content">Tin tức mới nhất</p>
                        <p className="content">Liên hệ hợp tác</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;