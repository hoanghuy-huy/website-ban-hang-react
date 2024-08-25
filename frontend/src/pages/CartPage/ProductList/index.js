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

function ProductList({ item }) {
    const dispatch = useDispatch();


    return (
        <>
            <div className="cart-item-container mt-4" key={item?.id}>
                <div className="cart-item ">
                    <div className="item d-flex align-items-center">
                        <div className="info-item d-flex align-items-center">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={item?.selected}
                                    onChange={() => dispatch(handleOnChangeSelected({ id: item.id }))}
                                />
                            </div>
                            <div className="thumbnail-img">
                                <Image src={item?.Product?.thumbnailUrl} alt="thumbnail" />
                            </div>
                            <div className="name">{item?.Product?.name}</div>
                        </div>
                        <div className="price">{convertPrice(item?.Product?.price)}</div>
                        <div className="item-quantity ">
                            <div className="quantity">
                                <span
                                    className="minus"
                                    onClick={() =>
                                        dispatch(handleOnClickChangeQuantity({ type: 'minus', id: item?.id }))
                                    }
                                >
                                    <img
                                        src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/decrease.svg"
                                        alt=""
                                    />
                                </span>
                                <input value={item?.quantity} />
                                <span
                                    className="plus"
                                    onClick={() => dispatch(handleOnClickChangeQuantity({ type: 'plus', id: item?.id }))}
                                >
                                    <img
                                        src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/increase.svg"
                                        alt=""
                                    />
                                </span>
                            </div>
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
