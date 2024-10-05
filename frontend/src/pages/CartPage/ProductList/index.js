import PropTypes from 'prop-types';
import React, { useEffect, useState, memo } from 'react';
import { convertPrice } from '~/utils/convert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

import _ from 'lodash';
import './ProductList.scss';
import { handleOnChangeSelected, handleOnClickChangeQuantity, handleShowModalDelete } from '~/redux/features/cartSlice';
import ModalDeleteItem from '../ModalDeleteItem';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';

function ProductList({ item }) {
    const dispatch = useDispatch();

    const handleAssignProduct = (id) => {
        dispatch(handleOnChangeSelected({ id: id }));
    };

    const handleChangeQuantityProduct = (type, idProduct, inventoryNumber) => {
        console.log(inventoryNumber);
        if (inventoryNumber === 0) return;
        dispatch(handleOnClickChangeQuantity({ type: type, id: idProduct, inventoryNumber }));
    };
    return (
        <>
            <div className="cart-item-container mt-4" key={item?.id}>
                <div className={item?.Product?.inventoryNumber === 0 ? 'cart-item disable' : 'cart-item'}>
                    <div className="item d-flex align-items-center">
                        <div className="info-item d-flex align-items-center">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={item?.selected}
                                    onChange={() => handleAssignProduct(item.id)}
                                    disabled={item?.Product?.inventoryNumber === 0 ? true : false}
                                />
                            </div>
                            <div className="thumbnail-img">
                                <Image src={item?.Product?.thumbnailUrl} alt="thumbnail" />
                            </div>
                            <Link to={'/detail-product/'+ item?.Product?.id}>
                                <div className="name">{item?.Product?.name}</div>
                            </Link>
                        </div>
                        <div className="price">{convertPrice(item?.Product?.price)}</div>
                        <div className="item-quantity">
                            <div className="quantity">
                                <span
                                    className="minus"
                                    onClick={() =>
                                        handleChangeQuantityProduct('minus', item?.id, item?.Product?.inventoryNumber)
                                    }
                                >
                                    <Image
                                        src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/decrease.svg"
                                        alt=""
                                    />
                                </span>
                                <input value={item?.quantity} />
                                <span
                                    className="plus"
                                    onClick={() =>
                                        handleChangeQuantityProduct('plus', item?.id, item?.Product?.inventoryNumber)
                                    }
                                >
                                    <Image
                                        src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/increase.svg"
                                        alt=""
                                    />
                                </span>
                            </div>
                            {item?.Product?.inventoryNumber < 10 &&
                                (item?.Product?.inventoryNumber === 0 ? (
                                    <span className="alert-out-of-stock">Đã hết hàng</span>
                                ) : (
                                    <span className="alert-number-inventory">
                                        Còn {item?.Product?.inventoryNumber} sản phẩm
                                    </span>
                                ))}
                        </div>
                        <div className="price-end">{convertPrice(item?.quantity * item?.Product?.price)}</div>
                        <div className="icon-trash mb-2" onClick={() => dispatch(handleShowModalDelete(item?.id))}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </div>
                    </div>
                </div>
            </div>

            <ModalDeleteItem />
        </>
    );
}

ProductList.propTypes = {
    item: PropTypes.object.isRequired,
};

export default memo(ProductList);
