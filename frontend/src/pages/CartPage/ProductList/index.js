import React, { useEffect, useState, memo } from 'react';
import { convertPrice } from '~/utils/convert';
import { changeQuantity, deleteOneProductFromCart, fetchAllCart } from '~/redux/features/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import Button from '~/components/Button/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';
import './ProductList.scss';

function ProductList({
    item,
    isSelected,
    onChange,
    setSelected,
    selected,
    handleRemoveProductFromCart,
    handleCloseModal,
    showModal,
    setShowModal,
}) {
    const defaultQuantity = item?.quantity;
    const [quantity, setQuantity] = useState(defaultQuantity);
    const defaultTotalPrice = quantity * item?.Product.price;
    const [totalPrice, setTotalPrice] = useState(defaultTotalPrice);
    const { userId, productId } = item;

    const dispatch = useDispatch();
    const handleChangeQuantity = (productId, quantity) => {
        let priceOrigin = item?.Product.price;
        if (quantity === 0) {
            setShowModal(true);
            return;
        }
        let _selected = _.cloneDeep(selected);

        setSelected(
            _selected.map((item) => {
                if (item.productId === productId) {
                    return {
                        ...item,
                        quantity: quantity,
                    };
                }
                return item;
            }),
        );
        setQuantity(quantity);

        setTimeout(() => {
            setTotalPrice(quantity * priceOrigin);

            dispatch(changeQuantity({ userId, productId, quantity }));
        }, 300);
    };
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
                                    value={totalPrice}
                                    checked={isSelected}
                                    onChange={onChange}
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
                                    onClick={() => handleChangeQuantity(item?.productId, quantity - 1)}
                                >
                                    <img
                                        src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/decrease.svg"
                                        alt=""
                                    />
                                </span>
                                <input value={quantity} />
                                <span
                                    className="plus"
                                    onClick={() => handleChangeQuantity(item?.productId, quantity + 1)}
                                >
                                    <img
                                        src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/increase.svg"
                                        alt=""
                                    />
                                </span>
                            </div>
                        </div>
                        <div className="price-end">{convertPrice(totalPrice)}</div>
                        <div className="icon-trash mb-2" onClick={() => handleCloseModal(productId)}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={handleCloseModal} size="sm" className="d-flex align-items-center">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FontAwesomeIcon icon={faTriangleExclamation} className="me-2 text-warning" />
                        Xóa sản phẩm
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có muốn xóa sản phẩm đang chọn không ?</Modal.Body>
                <Modal.Footer>
                    <Button outline onClick={() => handleRemoveProductFromCart()}>
                        Xác nhận
                    </Button>
                    <Button normal onClick={handleCloseModal}>
                        Hủy
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default memo(ProductList);
