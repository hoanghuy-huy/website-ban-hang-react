import React from 'react';
import './PaymentSuccessPage.scss';
import Button from '~/components/Button/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { convertPrice } from '~/utils/convert';
import BackdropComp from '~/components/BackDropComp';
import { setTempPriceRedux } from '~/redux/features/orderSlice';

const PaymentSuccessPage = () => {
    const { loading, totalPrice, tempPrice } = useSelector((state) => state.order);
    const dispatch = useDispatch();
    if (loading) {
        <BackdropComp loading={loading} />;
    }

    
    return (
        <main className="PaymentSuccessPage">
            <div className="PaymentSuccessPageContainer">
                <div className="success-order">
                    <div className="left">
                        <div className="section-container">
                            <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/tiki-mascot-congrat.svg" />
                            <div className="confetti-background"></div>

                            <div className="success-content">
                                <div className="success-content__header">
                                    <h1 className="title">Yay, đặt hàng thành công!</h1>
                                    <h3 className="sub-title">Chuẩn bị tiền mặt {convertPrice(tempPrice)} ₫</h3>
                                </div>

                                <div className="PaymentSummary">
                                    <div className="summary-item">
                                        <div className="summary-item__label">Phương thức thanh toán</div>
                                        <div className="summary-item__value  ">
                                            <div className="styleMethod">
                                                <div className="method-text">Thanh toán tiền mặt</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="summary-item">
                                    <div className="summary-item__label">Tổng cộng</div>
                                    <div className="summary-item__value summary-item__value--large">
                                        {convertPrice(tempPrice)} ₫
                                    </div>
                                </div>
                                <div className="success-content__button">
                                    <Link to={'/'}>
                                        <Button outline onClick={() => dispatch(setTempPriceRedux(0))}>
                                            Quay về trang chủ
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right"></div>
                </div>
            </div>
        </main>
    );
};

export default PaymentSuccessPage;
