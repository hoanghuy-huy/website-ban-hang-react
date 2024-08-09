import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '~/components/Button/Button';
import { fetchAllCart, deleteOneProductFromCart, deleteMultipleProductFormCart } from '~/redux/features/cartSlice';
import ProductList from './ProductList';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { convertPrice } from '~/utils/convert';
import { faTrashCan, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

import './CartPage.scss';
import { toast } from 'react-toastify';

const CartPage = () => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const { cartList, loading, error } = useSelector((state) => state.cart);
    const userId = useSelector((state) => state.account.account.userId);
    const defaultArraySelected = new Array(cartList.length);
    const [selectedProducts, setSelectedProducts] = useState(defaultArraySelected.fill(false));
    const [selected, setSelected] = useState(cartList);
    const [id, setId] = useState(null);
    const [showModalDeleteMultiple, setShowModalDeleteMultiple] = useState(false);

    const handleOnChangeSelectedProduct = (e, index) => {
        const updatedSelection = [...selectedProducts];
        updatedSelection[index] = !updatedSelection[index];

        setSelectedProducts(updatedSelection);

        let _update = _.cloneDeep(selected);
        _update[index].selected = !_update[index].selected;
        setSelected(_update);

        setSelectedProducts(updatedSelection);

        const allChecked = updatedSelection.every((selected) => selected);
        document.getElementById('checkAll').checked = allChecked;
    };

    const checkAll = (e) => {
        let isChecked = e.target.checked;
        setSelectedProducts(defaultArraySelected.fill(isChecked));
        let _update = _.cloneDeep(selected);
        setSelected(_update.map((item) => ({ ...item, selected: isChecked })));
    };

    const handleRemoveProductFromCart = () => {
        setShowModal(false);
        dispatch(deleteOneProductFromCart({ userId, productId: id }));
    };

    const handleCloseModal = (productId) => {
        setId(productId);
        setShowModal(!showModal);
    };

    useEffect(() => {
        dispatch(fetchAllCart(userId));

        // eslint-disable-next-line
    }, []);

    const countSelectedProduct = selectedProducts.reduce((acc, cur) => {
        return (acc = cur ? acc + 1 : acc);
    }, 0);

    const handleCalculateTotalPrice = () => {
        let totalPrice;
        totalPrice = selected.reduce((total, current) => {
            if (current.selected) {
                return total + current.quantity * current.Product.price;
            }
            return total;
        }, 0);

        return totalPrice;
    };

    const handleCloseModalDeleteMultiple = () => {
        setShowModalDeleteMultiple(false);
    };

    const handleRemoveMultipleItemFromCart = () => {
        let _selected = _.cloneDeep(selected);

        let itemsToDelete = _selected.filter((item) => item.selected === true);

        console.log(itemsToDelete);
        if (itemsToDelete.length === 0) {
            toast.error('Vui Lòng chọn sản phẩm cần xóa');
            setShowModalDeleteMultiple(false);
            return;
        }
        dispatch(deleteMultipleProductFormCart(itemsToDelete));
        setShowModalDeleteMultiple(false);
        setTimeout(() => {
            dispatch(fetchAllCart(userId));
        }, 300);
    };

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
                                <input className="form-check-input" type="checkbox" id="checkAll" onChange={checkAll} />
                                <label className="form-check-label">Tất cả ({cartList?.length} sản phẩm)</label>
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
                            <div className="icon-trash" onClick={() => setShowModalDeleteMultiple(true)}>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </div>
                        </div>

                        {cartList &&
                            cartList.length > 0 &&
                            cartList.map((item, index) => {
                                return (
                                    <ProductList
                                        key={item.id}
                                        item={item}
                                        isSelected={selectedProducts[index]}
                                        onChange={(e) => handleOnChangeSelectedProduct(e, index)}
                                        setSelected={setSelected}
                                        selected={selected}
                                        handleCloseModal={handleCloseModal}
                                        handleRemoveProductFromCart={() => handleRemoveProductFromCart(index)}
                                        showModal={showModal}
                                        setShowModal={setShowModal}
                                        setId={setId}
                                    />
                                );
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
                                    <Button primary>Mua hàng ({countSelectedProduct})</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                show={showModalDeleteMultiple}
                onHide={handleCloseModalDeleteMultiple}
                size="sm"
                className="d-flex align-items-center"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FontAwesomeIcon icon={faTriangleExclamation} className="me-2 text-warning" />
                        Xóa sản phẩm
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có muốn xóa sản phẩm đang chọn không ?</Modal.Body>
                <Modal.Footer>
                    <Button outline onClick={() => handleRemoveMultipleItemFromCart()}>
                        Xác nhận
                    </Button>
                    <Button normal onClick={handleCloseModalDeleteMultiple}>
                        Hủy
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CartPage;
