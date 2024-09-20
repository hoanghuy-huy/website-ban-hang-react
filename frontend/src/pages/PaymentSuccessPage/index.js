import React from 'react';
import './PaymentSuccessPage.scss';
import Button from '~/components/Button/Button';

const PaymentSuccessPage = () => {
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
                                    <h3 className="sub-title">Chuẩn bị tiền mặt 103.700 ₫</h3>
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
                                        103.700 ₫
                                    </div>
                                </div>
                                <div className='success-content__button'>
                                    <Button outline>Quay về trang chủ</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PaymentSuccessPage;
