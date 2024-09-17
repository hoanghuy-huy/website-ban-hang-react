import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import WarningIcon from '@mui/icons-material/Warning';
import { useSelector } from 'react-redux';

import Image from '~/components/Image';
import './PaymentPage.scss';
import { convertPrice } from '~/utils/convert';
import Button from '~/components/Button/Button';
const PaymentPage = () => {
    const { listAddress } = useSelector((state) => state.address);

    return (
        <div className="PaymentPage">
            <div className="PaymentPage-container">
                <div className="left">
                    <div className="section__left">
                        <h3 className="title"> Chọn hình thức giao hàng</h3>
                        <FormControl>
                            <RadioGroup>
                                <div className="methodListDelivery">
                                    <div className="methodListDelivery__container mt-2">
                                        <div className="d-flex align-items-center">
                                            <FormControlLabel
                                                name="method-delivery"
                                                value="economical-delivery"
                                                control={<Radio />}
                                                label="Giao tiết kiệm"
                                            />
                                            <div className="fee-delivery-badge">20k</div>
                                        </div>
                                    </div>
                                    <div className="methodListDelivery__container mt-2">
                                        <div className="d-flex align-items-center">
                                            <FormControlLabel
                                                name="method-delivery"
                                                value="fast-delivery"
                                                control={<Radio />}
                                                label="Giao hàng nhanh"
                                            />
                                            <div className="fee-delivery-badge ">10k</div>
                                        </div>
                                    </div>
                                </div>
                            </RadioGroup>
                        </FormControl>
                        <div className="product-item">
                            <div className="product-item__container">
                                <div className="product-item__header d-flex justify-content-between">
                                    <div className="method-text">Giao hang tiết kiệm</div>
                                    <div className="original-fee">32.200 ₫</div>
                                </div>
                                <div className="product-item__package-item-list">
                                    <div className="product-item__package-item">
                                        <div className="thumbnail-img">
                                            <img src="https://salt.tikicdn.com/cache/96x96/ts/product/5d/28/e3/fc87f9ba0cbc405554ac088925b44c2f.png" />
                                        </div>
                                        <div className="item-info">
                                            <div className="item-info__first-line">
                                                <span className="item-info__product-name">
                                                    Cà phê hoà tan NESCAFÉ 3IN1 VỊ NGUYÊN BẢN - công thức cải tiến (hộp
                                                    20 gói x 16g )
                                                </span>
                                            </div>
                                            <div className="item-info__second-line">
                                                <div className="item-info__quantity">SL: x1</div>
                                                <div>
                                                    <div className="item-info__price item-info__price-sale">
                                                        <span class="item-info__original-price">53.000 ₫</span>
                                                        <span>45.000 ₫</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="product-item__package-item">
                                        <div className="thumbnail-img">
                                            <img src="https://salt.tikicdn.com/cache/96x96/ts/product/5d/28/e3/fc87f9ba0cbc405554ac088925b44c2f.png" />
                                        </div>
                                        <div className="item-info">
                                            <div className="item-info__first-line">
                                                <span className="item-info__product-name">
                                                    Cà phê hoà tan NESCAFÉ 3IN1 VỊ NGUYÊN BẢN - công thức cải tiến (hộp
                                                    20 gói x 16g )
                                                </span>
                                            </div>
                                            <div className="item-info__second-line">
                                                <div className="item-info__quantity">SL: x1</div>
                                                <div>
                                                    <div className="item-info__price item-info__price-sale">
                                                        <span class="item-info__original-price">53.000 ₫</span>
                                                        <span>45.000 ₫</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="product-item__package-item">
                                        <div className="thumbnail-img">
                                            <Image src="https://salt.tikicdn.com/cache/96x96/ts/product/5d/28/e3/fc87f9ba0cbc405554ac088925b44c2f.png" />
                                        </div>
                                        <div className="item-info">
                                            <div className="item-info__first-line">
                                                <span className="item-info__product-name">
                                                    Cà phê hoà tan NESCAFÉ 3IN1 VỊ NGUYÊN BẢN - công thức cải tiến (hộp
                                                    20 gói x 16g )
                                                </span>
                                            </div>
                                            <div className="item-info__second-line">
                                                <div className="item-info__quantity">SL: x1</div>
                                                <div>
                                                    <div className="item-info__price item-info__price-sale">
                                                        <span class="item-info__original-price">53.000 ₫</span>
                                                        <span>45.000 ₫</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="payment-method ">
                        <h3 className="payment-method__title">Chọn phương thức thanh toán</h3>
                        <div>
                            <FormControl>
                                <RadioGroup>
                                    <div>
                                        <div className="payment-method-item ">
                                            <FormControlLabel name="payment-method" value="cash" control={<Radio />} />
                                            <img
                                                src="https://salt.tikicdn.com/ts/upload/92/b2/78/1b3b9cda5208b323eb9ec56b84c7eb87.png"
                                                height={32}
                                                width={32}
                                            />
                                            <span>Thanh toán khi nhận hàng</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="payment-method-item ">
                                            <FormControlLabel name="payment-method" value="momo" control={<Radio />} />
                                            <img
                                                src="https://salt.tikicdn.com/ts/upload/ce/f6/e8/ea880ef285856f744e3ffb5d282d4b2d.jpg"
                                                height={32}
                                                width={32}
                                            />
                                            <span>Thanh toán bằng momo</span>
                                        </div>
                                    </div>
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="DeliveryAddress-box">
                        <div className="DeliveryAddress-box__header">
                            <div className="header__title"> Giao tới</div>

                            {listAddress ? (
                                <div className="header__action"> Thay Đổi</div>
                            ) : (
                                <div className="header__action"> Nhập</div>
                            )}
                        </div>

                        {listAddress ? (
                            <>
                                <div className="DeliveryAddress-box__info">
                                    <p className="customer_info__name">{listAddress?.recipientName}</p>
                                    <i></i>
                                    <p className="customer_info__phone">{listAddress?.phone}</p>
                                </div>
                                <div className="DeliveryAddress-box__address">
                                    {listAddress?.typeAddress === 'home' ? (
                                        <span className="address__type address__type--home">Nhà</span>
                                    ) : (
                                        <span className="address__type address__type--company">Công Ty</span>
                                    )}
                                    {listAddress?.address} {', '}
                                    {listAddress?.ward}
                                    {', '}
                                    {listAddress?.district}
                                    {', '}
                                    {listAddress?.city}
                                </div>
                            </>
                        ) : (
                            <div className="warning-info gap-3 d-flex align-items-center">
                                <WarningIcon sx={{ color: '#ffc107 !important' }} /> Vui lòng nhập thông tin vận chuyển
                            </div>
                        )}
                    </div>

                    <div className="buy-box">
                        <ul className="buy-box__prices-items">
                            <li className="buy-box__prices-item">
                                <div className="prices-item_text">Tạm tính</div>
                                <div className="prices-item_value">
                                    {' '}
                                    {convertPrice(1231234)}
                                    <sup>₫</sup>
                                </div>
                            </li>
                        </ul>
                        <div className="price-total d-flex justify-content-between">
                            <span className="price-total__price-text">Tổng tiền</span>
                            <div className="price-total__content">
                                <div className="price-total__prices-value">
                                    Vui lòng chọn sản phẩm
                                    <br />
                                    <span className="price-total__price-value-noted">(Đã bao gồm VAT nếu có)</span>
                                </div>
                            </div>
                        </div>
                        <div className="me-3">
                            <Button primary>
                                Đặt hàng
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
