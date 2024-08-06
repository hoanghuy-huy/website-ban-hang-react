import React, { useMemo } from 'react';
import { convertPrice } from '~/utils/convert';
import { changeQuantity, getAllCart } from '~/redux/features/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

const ProductList = ({item}) => {
    const dispatch = useDispatch();

    const userId = useSelector((state) => state.account.account.userId);

    const handleChangeQuantity = (productId, quantity) => {
        dispatch(changeQuantity({userId, productId, quantity}))
    
        
    }
    return (
        <div className="cart-item-container mt-4" key={item?.id}>
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
                            <img src={item?.Product?.thumbnailUrl} alt="thumbnail" />
                        </div>
                        <div className="name">{item?.Product?.name}</div>
                    </div>
                    <div className="price">{convertPrice(item?.Product?.price)}</div>
                    <div className="item-quantity ">
                        <div className="quantity">
                            <span
                                className="minus"
                                onClick={() => handleChangeQuantity(item.productId, item?.quantity - 1)}
                            >
                                <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/decrease.svg" />
                            </span>
                            <input value={item?.quantity} />
                            <span
                                className="plus"
                                onClick={() => handleChangeQuantity(item.productId, item?.quantity + 1)}
                            >
                                <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/increase.svg" />
                            </span>
                        </div>
                    </div>
                    <div className="price-end">{convertPrice(item?.quantity * item?.Product?.price)}</div>
                    <div className="icon-trash">
                        <FontAwesomeIcon icon={faTrashCan} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
