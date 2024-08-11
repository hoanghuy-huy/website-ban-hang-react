import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '~/components/Button/Button';
import {
    fetchAllCart,
    handleOnChangeSelectedAll,
    handleShowModalDelete,
} from '~/redux/features/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { convertPrice } from '~/utils/convert';
import { faTrashCan, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import ProductList from './ProductList';
import _ from 'lodash'
import './CartPage.scss';

const CartPage = () => {
    const { loading, error, cartList } = useSelector((state) => state.cart);
    const { userId } = useSelector((state) => state.account.account);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllCart(userId))
        

    }, []);

    const checkSelectedAll = () => {
        const checkAll = cartList?.every((item) => item?.selected === true)
        // document.getElementById('checkAll').checked = checkAll
        return checkAll
    }

    const handleCalculateTotalPrice = () => {
        let totalPrice = cartList?.reduce((total, currentValue) => {
            if (currentValue?.selected === true) {
                return (total += currentValue.quantity * currentValue.Product.price);
            }
            return total;
        }, 0);

        return totalPrice;
    };

    const quantityProductSelected = () => {
        let itemSelected = cartList?.filter((item) => item?.selected === true);

        return itemSelected ? itemSelected?.length : 0 ;
    };

    const handleRemoveMultipleItemFromCart = () => {
        let _cartList = _.cloneDeep(cartList)
        
        let itemsToRemove = _cartList.filter((item) => {
            if(item.selected === true) {
                return item
            }
            return false;
        })

        return itemsToRemove
    }   
    if (loading === true && error === false) {
        return <div>loading...</div>;
    } else if (loading === false && error === true) {
        return <div>Something wrong with server!</div>;
    }

    return (
        <>
            <div className="cart-page-container">
                <div className="row mx-4">
                    <div className="main-content col-8">
                        <div className="main-title">
                            <h4>Giỏ hàng</h4>
                        </div>
                        <div className="heading d-flex align-items-center justify-content-between">
                            <div className="form-check ">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="checkAll"
                                    checked={checkSelectedAll()}
                                    onChange={(e) => dispatch(handleOnChangeSelectedAll(e.target.checked))}
                                />
                                <label className="form-check-label">Tất cả ( sản phẩm)</label>
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
                            <div className="icon-trash" onClick={() => dispatch(handleShowModalDelete(handleRemoveMultipleItemFromCart()))}>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </div>
                        </div>

                        {cartList &&
                            cartList.length > 0 &&
                            cartList.map((item, index) => {
                                return <ProductList key={item?.id} item={item} />;
                            })}
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
                                            {' '}
                                            {convertPrice(handleCalculateTotalPrice())}
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
                                            <span className="price-total__price-value-noted">
                                                (Đã bao gồm VAT nếu có)
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="me-3">
                                    <Button primary>Mua hàng ({quantityProductSelected()})</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartPage;
