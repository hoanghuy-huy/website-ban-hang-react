import React from 'react';
import './CartPage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button/Button';
const CartPage = () => {
    return (
        <div className="cart-page-container">
            <div className="row mx-4">
                <div className="main-content col-8">
                    <div className="main-title">
                        <h4>Giỏ hàng</h4>
                    </div>
                    <div className="heading d-flex align-items-center justify-content-between">
                        <div class="form-check ">
                            <input
                                class="form-check-input"
                                type="checkbox"
                                id="check1"
                                name="option1"
                                value="something"
                                checked
                            />
                            <label class="form-check-label">Tất cả (2 sản phẩm)</label>
                        </div>
                        <div>
                            <span>Đơn giá</span>
                        </div>
                        <div>
                            <span>Số Lượng</span>
                        </div>
                        <div>
                            <span>Thành tiền</span>
                        </div>
                        <div className="icon-trash">
                            <FontAwesomeIcon icon={faTrashCan} />
                        </div>
                    </div>
                    <div className="cart-item-container mt-4">
                        <div className="cart-item ">
                            <div className="item d-flex align-items-center">
                                <div className="info-item d-flex align-items-center">
                                    <div class="form-check">
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id="check1"
                                            name="option1"
                                            value="something"
                                            checked
                                        />
                                    </div>
                                    <div className="thumbnail-img">
                                        <img
                                            src="https://salt.tikicdn.com/cache/w160/ts/product/d8/3f/ff/349f00378ee727986aa52fc0d1dc4883.png.webp"
                                            alt=""
                                        />
                                    </div>
                                    <div className="name">
                                        Ấm Siêu Tốc Thủy Tinh Sunhouse SHD1330 (1.7 Lít) - Hàng Chính Hãng
                                    </div>
                                </div>
                                <div className="price">470.000</div>
                                <div className="item-quantity ">
                                    <div className="quantity">
                                        <span className="minus">
                                            <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/decrease.svg" />
                                        </span>
                                        <input value={1} />
                                        <span className="plus">
                                            <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/increase.svg" />
                                        </span>
                                    </div>
                                </div>
                                <div className="price-end">470.000</div>
                                <div className="icon-trash">
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cart-page__content-right col-4">
                    <div className="right-inner">
                        <div className="voucher-box">
                            <div className="voucher-box__header">
                                <div className="header__title"> Chọn voucher</div>
                            </div>
                            <div className="voucher-box__content">Chọn hoăc nhập mã khuyến mãi</div>
                        </div>
                        <div className="buy-box">
                            <ul className="buy-box__prices-items">
                                <li className="buy-box__prices-item">
                                    <div className="prices-item_text">Tạm tính</div>
                                    <div className="prices-item_value">
                                        0<sup>₫</sup>
                                    </div>
                                </li>
                                <li className="buy-box__prices-item">
                                    <div className="prices-item_text">Tạm tính</div>
                                    <div className="prices-item_value">
                                        0<sup>₫</sup>
                                    </div>
                                </li>
                            </ul>
                            <div className="price-total d-flex justify-content-between">
                                <span className="price-total__price-text">Tổng tiền</span>
                                <div className="price-total__content">
                                    <div className="price-total__prices-value">
                                        Vui lòng chọn sản phẩm
                                        <br/>
                                        <span className="price-total__price-value-noted">(Đã bao gồm VAT nếu có)</span>
                                    </div>
                                </div>
                            </div>
                            <div className='me-3'>
                                <Button primary>Mua hàng (0)</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
