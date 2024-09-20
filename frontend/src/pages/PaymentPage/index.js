import React, { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import WarningIcon from '@mui/icons-material/Warning';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2';
import Image from '~/components/Image';
import './PaymentPage.scss';
import { convertPrice } from '~/utils/convert';
import Button from '~/components/Button/Button';
import { getAddressDefault } from '~/redux/features/addressSlice';
import * as paymentService from '~/services/paymentService';

const PaymentPage = () => {
    const listMethodDelivery = [
        {
            id: 0,
            name: 'Giao hàng tiết kiệm',
            feeDeliveryText: '10K',
            feeDelivery: 10000,
        },
        {
            id: 1,
            name: 'Giao hàng nhanh',
            feeDeliveryText: '20k',
            feeDelivery: 20000,
        },
    ];

    const { addressDefault, changeAddress } = useSelector((state) => state.address);
    const laterPayment = 'Later Payment';
    const { userId } = useSelector((state) => state.account.account);
    const { itemsToOrder } = useSelector((state) => state.cart);
    const [methodDelivery, setMethodDelivery] = useState(listMethodDelivery[0]);
    const [methodPayment, setMethodPayment] = useState(laterPayment);
    const [sdkReady, setSdkReady] = useState(false)
    const dispatch = useDispatch();

    const handleOnChangeInput = (value, item) => {
        setMethodDelivery(item);
    };

    const totalPriceItem = () => {
        let totalPrice = itemsToOrder.reduce((total, currentValue) => {
            return (total += currentValue.Product.price * currentValue.quantity);
        }, 0);

        return totalPrice;
    };

    const totalPriceToOrder = () => {
        let totalPrice = itemsToOrder.reduce((total, currentValue) => {
            return (total += currentValue.Product.price * currentValue.quantity);
        }, 0);

        totalPrice += methodDelivery.feeDelivery;

        return totalPrice;
    };

    const addPaypalScript = async () => {
        const data = await paymentService.apiGetClientId();

        if (data && data.data) {
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://sandbox.paypal.com/sdk/js?client-id=${data.data}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            script.onerror = () => {
                console.error("Failed to load PayPal SDK");
            };

            document.body.appendChild(script)

        }
    };

    const handleOnChangeInputPayment = (value) => {

        setMethodPayment(value);
    };

    const handleErrorPaypal = () => {
        
    }

    useEffect(() => {
        if (!changeAddress) {
            dispatch(getAddressDefault(userId));
        }
        if(!window.paypal) {
            addPaypalScript();
        }else {
            setSdkReady(true)
        }
    }, []);

    return (
        <div className="PaymentPage">
            <div className="PaymentPage-container">
                <div className="left">
                    <div className="section__left">
                        <h3 className="title"> Chọn hình thức giao hàng</h3>
                        <FormControl>
                            <RadioGroup defaultValue={0}>
                                <div className="methodListDelivery">
                                    {listMethodDelivery?.map((item) => {
                                        return (
                                            <div className="methodListDelivery__container mt-2">
                                                <div className="d-flex align-items-center">
                                                    <FormControlLabel
                                                        name="method-delivery"
                                                        value={item.id}
                                                        control={<Radio />}
                                                        label={item?.name}
                                                        onChange={(e) => handleOnChangeInput(e.target.value, item)}
                                                    />
                                                    <div className="fee-delivery-badge">{item?.feeDeliveryText}</div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </RadioGroup>
                        </FormControl>
                        <div className="product-item">
                            <div className="product-item__container">
                                <div className="product-item__header d-flex justify-content-between">
                                    <div className="method-text">{methodDelivery.name}</div>
                                    <div className="original-fee">{convertPrice(methodDelivery.feeDelivery)} ₫</div>
                                </div>
                                <div className="product-item__package-item-list">
                                    {itemsToOrder.map((item) => {
                                        return (
                                            <div className="product-item__package-item gap-4">
                                                <div className="thumbnail-img">
                                                    <img src={item?.Product?.thumbnailUrl} />
                                                </div>
                                                <div className="item-info">
                                                    <div className="item-info__first-line">
                                                        <span className="item-info__product-name">
                                                            {item.Product.name}
                                                        </span>
                                                    </div>
                                                    <div className="item-info__second-line">
                                                        <div className="item-info__quantity">SL: x{item?.quantity}</div>
                                                        <div>
                                                            <div className="item-info__price item-info__price-sale">
                                                                <span class="item-info__original-price">
                                                                    {convertPrice(item?.Product.originalPrice)} ₫
                                                                </span>
                                                                <span>{convertPrice(item?.Product?.price)} ₫</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {/* <div className="product-item__package-item">
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
                                    </div> */}
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
                                            <FormControlLabel
                                                name="payment-method"
                                                value="cash"
                                                control={<Radio />}
                                                onChange={(e) => handleOnChangeInputPayment(e.target.value)}
                                            />
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
                                            <FormControlLabel
                                                name="payment-method"
                                                value="paypal"
                                                control={<Radio />}
                                                onChange={(e) => handleOnChangeInputPayment(e.target.value)}
                                            />
                                            <img
                                                src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-mark-color.svg"
                                                height={32}
                                                width={32}
                                            />
                                            <span>Thanh toán bằng paypal</span>
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

                            {/* {addressDefault ? (
                                <div className="header__action">
                                    <Link to={'/address'}>Thay Đổi</Link>
                                </div>
                            ) : (
                                <div className="header__action"> Nhập</div>
                            )} */}
                        </div>

                        {addressDefault ? (
                            <>
                                <div className="DeliveryAddress-box__info">
                                    <p className="customer_info__name">{addressDefault?.recipientName}</p>
                                    <i></i>
                                    <p className="customer_info__phone">{addressDefault?.phone}</p>
                                </div>
                                <div className="DeliveryAddress-box__address">
                                    {addressDefault?.typeAddress === 'home' ? (
                                        <span className="address__type address__type--home">Nhà</span>
                                    ) : (
                                        <span className="address__type address__type--company">Công Ty</span>
                                    )}
                                    {addressDefault?.address} {', '}
                                    {addressDefault?.ward}
                                    {', '}
                                    {addressDefault?.district}
                                    {', '}
                                    {addressDefault?.city}
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
                                    {convertPrice(totalPriceItem())}
                                    <sup>₫</sup>
                                </div>
                            </li>
                            <li className="buy-box__prices-item">
                                <div className="prices-item_text">Phí vận chuyển</div>
                                <div className="prices-item_value">
                                    {' '}
                                    {convertPrice(methodDelivery.feeDelivery)}
                                    <sup>₫</sup>
                                </div>
                            </li>
                        </ul>
                        <div className="price-total d-flex justify-content-between">
                            <span className="price-total__price-text">Tổng tiền</span>
                            <div className="price-total__content">
                                <div className="price-total__prices-value">
                                    {convertPrice(totalPriceToOrder())}
                                    <br />
                                    <span className="price-total__price-value-noted">(Đã bao gồm VAT nếu có)</span>
                                </div>
                            </div>
                        </div>
                        <div className="me-3">
                            {methodPayment === 'paypal' && sdkReady ? (
                                <PayPalButton
                                    amount={totalPriceToOrder() / 20000}
                                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                    onSuccess={(details, data) => {
                                        alert('Transaction completed by ' + details.payer.name.given_name);

                                        // OPTIONAL: Call your server to save the transaction
                                        return fetch('/paypal-transaction-complete', {
                                            method: 'post',
                                            body: JSON.stringify({
                                                orderID: data.orderID,
                                            }),
                                        });
                                    }}

                                    onError={() => handleErrorPaypal()}
                                />
                            ) : (
                                <Button primary>Đặt hàng</Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
