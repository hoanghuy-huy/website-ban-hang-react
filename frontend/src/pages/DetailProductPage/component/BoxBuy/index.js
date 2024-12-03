import React, { useEffect, useState } from 'react';
import Button from '~/components/Button/Button';
import './BoxBuy.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart, fetchAllCart, handlePurchaseProduct } from '~/redux/features/cartSlice';
import { showLoginForm } from '~/redux/features/accountSlice';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SnackbarComp from '../Snackbar';
import { convertPrice } from '~/utils/convert';
import { getAddressDefault } from '~/redux/features/addressSlice';
import { toast } from 'react-toastify';
const BoxBuy = ({ item }) => {
    const userId = useSelector((state) => state.account.account.userId);
    const auth = useSelector((state) => state.account.auth);
    const cartList = useSelector((state) => state.cart.cartList);
    const [quantity, setQuantity] = useState(1);
    const originalPrice = item?.price;
    const [price, setPrice] = useState(originalPrice);
    const dispatch = useDispatch();
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [messageSnackbar, setMessageSnackbar] = useState('');
    const cartItem = cartList?.find((product) => product?.productId === item?.id);
    const { addressDefault } = useSelector((state) => state.address);
    const handlePrice = (type, _quantity) => {
        if (_quantity < 1) {
            return;
        }

        if (!!cartItem) {
            if (cartItem.quantity + _quantity > item.inventoryNumber && type == 'plus') {
                setMessageSnackbar(
                    `Số lượng sản phẩm trong kho chỉ còn ${item.inventoryNumber} và bạn đã thêm vào giỏ ${cartItem.quantity} rồi`,
                );
                setShowSnackbar(true);
                return;
            }
            if (cartItem.quantity + _quantity > 10 && type == 'plus') {
                setMessageSnackbar(
                    `Số lượng tối đa để đặt hàng là 10 sản phẩm trong giỏ hàng của bạn đã có ${cartItem.quantity} rồi`,
                );
                setShowSnackbar(true);
                return;
            }
        }

        if (_quantity > 10) {
            setShowSnackbar(true);
            setMessageSnackbar('');
            return;
        }

        if (_quantity >= item?.inventoryNumber) {
            setShowSnackbar(true);
            setMessageSnackbar(`Số lượng trong kho chỉ còn ${item?.inventoryNumber} sản phẩm`);
            return;
        }

        setQuantity(_quantity);
        const timer = setTimeout(() => {
            setPrice(_quantity * originalPrice);
        }, 100);

        return () => {
            clearTimeout(timer);
        };
    };

    const handleAddItemToCart = (item) => {
        let productId = item.id;
        if (auth) {
            if (cartItem && cartItem?.quantity >= 10) {
                setMessageSnackbar(
                    `Bạn không thể thêm trên 10 sản phẩm và trong giỏ hàng của bạn đang có ${cartItem.quantity}`,
                );
                setShowSnackbar(true);
                return;
            }

            if (cartItem && cartItem.quantity >= item?.inventoryNumber) {
                setMessageSnackbar(`Số lượng trong kho chỉ còn ${item?.inventoryNumber} sản phẩm`);
                setShowSnackbar(true);

                return;
            }

            dispatch(addProductToCart({ productId, userId, quantity }));
        } else {
            dispatch(showLoginForm());
        }
    };
    const handleBuyNowProduct = async (item) => {
        let productId = item.id;
        if (auth) {
            console.log(addressDefault);
            if (!addressDefault) {
                window.location.href = '/address';
                return;
            }
            let arr = [];
            let obj = { productId, userId, quantity, Product: item };
            arr.push(obj);
            dispatch(handlePurchaseProduct(arr));
        } else {
            dispatch(showLoginForm());
        }
    };

    useEffect(() => {
        getAddressDefault(userId);
    }, []);
    return (
        <div className="content-right col-3 gap-5">
            {item?.inventoryNumber > 0 ? (
                <>
                    <div className="content-right__quantity-input mx-3">
                        <p className="label mt-2">Số Lượng</p>
                        <div className="group-input">
                            <button
                                onClick={() => handlePrice('minus', quantity - 1)}
                                className={quantity === 1 ? 'disable' : ''}
                            >
                                <img
                                    src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-remove.svg"
                                    alt="remove-icon"
                                    width="20"
                                    height="20"
                                />
                            </button>
                            <input type="text" value={quantity} className="input" tabIndex="-1" />
                            <button onClick={() => handlePrice('plus', quantity + 1)}>
                                <img
                                    src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-add.svg"
                                    alt="add-icon"
                                    width="20"
                                    height="20"
                                />
                            </button>
                        </div>
                    </div>
                    <div className="content-right__price-container mx-3">
                        <div className="label">Tạm tính</div>
                        <div className="price">
                            <div>{convertPrice(price)}</div>
                        </div>
                    </div>
                    <div className="content-right__group-button mx-3 mt-4">
                        <Button primary onClick={() => handleBuyNowProduct(item)}>
                            Mua Ngay
                        </Button>
                        <Button normal outline onClick={() => handleAddItemToCart(item)}>
                            Thêm Vào Giỏ Hàng
                        </Button>
                    </div>
                </>
            ) : (
                <div className="alert-out-of-stock">
                    <div className="text-container">
                        <div className="title">
                            <ErrorOutlineIcon />
                            Sản phẩm đã hết hàng
                        </div>
                        <span className="decs">Bạn vui lòng chọn sản phẩm khác.</span>
                    </div>
                </div>
            )}
            <SnackbarComp show={showSnackbar} setShow={setShowSnackbar} message={messageSnackbar} />
        </div>
    );
};

export default BoxBuy;
