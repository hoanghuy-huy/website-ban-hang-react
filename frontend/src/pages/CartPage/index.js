import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '~/components/Button/Button';
import {
    fetchAllCart,
    handleHideModalAddress,
    handleOnChangeSelectedAll,
    handlePurchaseProduct,
    handleShowModalAddress,
    handleShowModalDelete,
} from '~/redux/features/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { convertPrice } from '~/utils/convert';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import ProductList from './ProductList';
import _ from 'lodash';
import ModalErrorPurchaseItem from './ModalErrorPurchaseItem';
import WarningIcon from '@mui/icons-material/Warning';
import ModalAddress from './ModalAddress';
import { toast } from 'react-toastify';
import { createNewAddressApi, editAddressApi, getAllAddressWithUserId } from '~/redux/features/addressSlice';
import ModalAddressEdit from './ModalAddressEdit';
import './CartPage.scss';

const CartPage = () => {
    const { loading, error, cartList } = useSelector((state) => state.cart);
    const { userId } = useSelector((state) => state.account.account);
    const [showModalError, setShowModalError] = useState(false);
    const { listAddress } = useSelector((state) => state.address);
    const [showModalEditAddress, setShowModalEditAddress] = useState(false);

    const defaultValueAddress = {
        id: listAddress ? listAddress?.id : '',
        userId: userId,
        recipientName: listAddress ? listAddress?.recipientName : '',
        phone: listAddress ? listAddress?.phone : '',
        city: '',
        district: '',
        ward: '',
        address: listAddress ? listAddress?.address : '',
        typeAddress: '',
        defaultAddress: '',
    };

    const defaultValidAddress = {
        recipientName: true,
        phone: true,
        city: true,
        district: true,
        ward: true,
        address: true,
        typeAddress: true,
        defaultAddress: true,
    };

    const validatePhoneNumber = (phone) => {
        const regex = /^(0[3|5|7|8|9][0-9]{8}|[0-9]{10})$/;
        return regex.test(phone);
    };

    const [infoAddress, setInfoAddress] = useState(defaultValueAddress);
    const [validInfoAddress, setValidInfoAddress] = useState(defaultValidAddress);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllCart(userId));
        dispatch(getAllAddressWithUserId(userId));
    }, []);

    const checkSelectedAll = () => {
        const checkAll = cartList?.every((item) => item?.selected === true);
        // document.getElementById('checkAll').checked = checkAll
        return checkAll;
    };

    const handleCalculateTotalPrice = () => {
        let totalPrice = cartList?.reduce((total, currentValue) => {
            if (currentValue?.selected === true) {
                return (total += currentValue?.quantity * currentValue?.Product?.price);
            }
            return total;
        }, 0);

        return totalPrice;
    };

    const quantityProductSelected = () => {
        let itemSelected = cartList?.filter((item) => item?.selected === true);

        return itemSelected ? itemSelected?.length : 0;
    };

    const handleRemoveMultipleItemFromCart = () => {
        let _cartList = _.cloneDeep(cartList);

        let itemsToRemove = _cartList.filter((item) => {
            if (item.selected === true) {
                return item;
            }
            return false;
        });

        return itemsToRemove;
    };

    const handleHideModalError = () => {
        setShowModalError(false);
    };

    const handleBuildDataToPurchase = (rawData) => {
        let data = rawData.filter((item) => item.selected === true);

        if (data?.length === 0) {
            setShowModalError(true);
            return;
        }

        if (!listAddress) {
            dispatch(handleShowModalAddress());
            toast.warn('Vui lòng nhập địa chỉ giao hàng');
        }

        dispatch(handlePurchaseProduct(data));
    };

    const handleValidInputAddress = () => {
        setValidInfoAddress(defaultValidAddress);
        let check = true;
        let arr = ['recipientName', 'phone', 'city', 'district', 'ward', 'address'];
        let name = ['họ tên', 'số điện thoại', 'tỉnh thành', 'quận huyện', 'phường xã', 'địa chỉ'];

        let i = 0;
        for (i = 0; i < arr.length; i++) {
            if (!infoAddress[arr[i]]) {
                let _validInputs = _.cloneDeep(defaultValidAddress);
                _validInputs[arr[i]] = false;
                setValidInfoAddress(_validInputs);

                toast.error(`Không thể để trống ${name[i].toLocaleLowerCase()}`);
                check = false;
                break;
            }
        }
        return check;
    };

    const handleSaveAddress = () => {
        let valid = handleValidInputAddress();

        if (valid) {
            dispatch(handleHideModalAddress());
            dispatch(createNewAddressApi(infoAddress));
            window.location.reload();
        }
    };

    const handleSaveEditAddress = () => {
        let valid = handleValidInputAddress();
        console.log( typeof infoAddress.phone)
       if(valid){
            console.log(infoAddress)
            dispatch(editAddressApi(infoAddress));
            setShowModalEditAddress(false)
            // window.location.reload();
        }
    };

    const handleCloseModalAddress = () => {
        dispatch(handleHideModalAddress());
    };

    const handleCloseModalEditAddress = () => {
        setShowModalEditAddress(false);
    };

    if (loading === true && error === false) {
        return <div>loading...</div>;
    } else if (loading === false && error === true) {
        return <div>Something wrong with server!</div>;
    }

    return (
        <>
            <div className="cart-page-container col-12">
                <div className="main-title ms-4">
                    <h4>Giỏ hàng</h4>
                </div>
                {cartList && cartList.length > 0 ? (
                    <div className="row mx-4">
                        <div className="main-content col-8">
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
                                <div
                                    className="icon-trash"
                                    onClick={() => dispatch(handleShowModalDelete(handleRemoveMultipleItemFromCart()))}
                                >
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </div>
                            </div>

                            {cartList &&
                                cartList.length > 0 &&
                                cartList.map((item, index) => {
                                    return <ProductList key={item?.id} item={item} />;
                                })}
                        </div>
                        <div className="cart-page__content-right col-4 mt-3">
                            <div className="right-inner">
                                <div className="DeliveryAddress-box">
                                    <div className="DeliveryAddress-box__header">
                                        <div className="header__title"> Giao tới</div>

                                        {listAddress ? (
                                            <div
                                                onClick={() => setShowModalEditAddress(true)}
                                                className="header__action"
                                            >
                                                {' '}
                                                Thay Đổi
                                            </div>
                                        ) : (<div
                                            onClick={() => dispatch(handleShowModalAddress())}
                                            className="header__action"
                                        >
                                            {' '}
                                            Nhập
                                        </div>)}
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
                                                    <span className="address__type address__type--company">
                                                        Công Ty
                                                    </span>
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
                                        <div className="warning-info gap-3 d-flex align-items-center ps-5">
                                            <WarningIcon sx={{ color: '#ffc107 !important' }} /> Vui lòng nhập thông tin
                                            vận chuyển
                                        </div>
                                    )}
                                </div>

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
                                        <Button primary onClick={() => handleBuildDataToPurchase(cartList)}>
                                            Mua hàng ({quantityProductSelected()})
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="empty-product-cart d-flex flex-column align-items-center col-11 ms-4 mt-3 justify-content-center">
                        <div className="cart-img ">
                            <img
                                src="https://salt.tikicdn.com/ts/upload/43/fd/59/6c0f335100e0d9fab8e8736d6d2fbcad.png"
                                alt=""
                            />
                        </div>
                        <p>Giỏ hàng trống</p>
                    </div>
                )}
            </div>

            <ModalErrorPurchaseItem show={showModalError} handleHide={handleHideModalError} />

            <ModalAddress
                setValidInfoAddress={setValidInfoAddress}
                validInfoAddress={validInfoAddress}
                defaultValidAddress={defaultValidAddress}
                handleSave={handleSaveAddress}
                handleHide={handleCloseModalAddress}
                infoAddress={infoAddress}
                setInfoAddress={setInfoAddress}
            />

            <ModalAddressEdit
                show={showModalEditAddress}
                setValidInfoAddress={setValidInfoAddress}
                validInfoAddress={validInfoAddress}
                defaultValidAddress={defaultValidAddress}
                handleSave={handleSaveEditAddress}
                handleHide={handleCloseModalEditAddress}
                infoAddress={infoAddress}
                setInfoAddress={setInfoAddress}
            />
        </>
    );
};

export default CartPage;
