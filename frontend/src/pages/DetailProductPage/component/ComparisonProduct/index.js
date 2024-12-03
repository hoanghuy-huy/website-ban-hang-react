import React, { useState } from 'react';
import Button from '~/components/Button/Button';
import './ComparisonProduct.scss';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import { convertPrice } from '~/utils/convert';
import { useDispatch, useSelector } from 'react-redux';
import { handleDeleteItemCompare, handleShowModalAddProductToCompare } from '~/redux/features/detailProductSlice';
import ModalAddProductToCompare from '../MainContent/ModalAddProductToCompare';
import { addProductToCart } from '~/redux/features/cartSlice';
import { toast } from 'react-toastify';
import { showLoginForm } from '~/redux/features/accountSlice';
function ComparisonProductBox({ defaultProductAttribute, defaultItem }) {
    const dispatch = useDispatch();
    const { listProductToCompare } = useSelector((state) => state.detailProduct);
    const auth = useSelector((state) => state.account.auth);
    const cartList = useSelector((state) => state.cart.cartList);
    const userId = useSelector((state) => state.account.account.userId);

    const handleAddItemToCart = (item) => {
        const cartItem = cartList?.find((product) => product?.productId === item?.id);

        let productId = item.id;
        if (auth) {
            if (cartItem && cartItem.quantity >= 10) {
                toast.error(
                    `Bạn không thể thêm trên 10 sản phẩm và trong giỏ hàng của bạn đang có ${cartItem.quantity}`,
                );
                return;
            }

            if (cartItem && cartItem.quantity >= item?.inventoryNumber) {
                toast.error(`Số lượng trong kho chỉ còn ${item?.inventoryNumber} sản phẩm`);
                return;
            }

            dispatch(addProductToCart({ productId, userId, quantity: 1 }));
        } else {
            dispatch(showLoginForm());
        }
    };
    const selectedCodes = ['is_warranty_applied', 'warranty_time_period', 'warranty_form'];
    return (
        <div className="product-comparison ms-3 col-12">
            <div className="title">So sánh sản phẩm tương tự</div>

            <div className="product-comparison-table mt-3 mx-4">
                <div className="row">
                    {listProductToCompare &&
                        listProductToCompare.length > 0 &&
                        listProductToCompare.map((product, index) => (
                            <div className="col-3" key={product.id}>
                                <div className={`product-comparison-table__item ${index % 2 === 0 ? 'highlight' : ''}`}>
                                    <div
                                        className={index !== 0 ? 'delete-icon' : 'delete-icon d-none'}
                                        onClick={() => dispatch(handleDeleteItemCompare(product))}
                                    >
                                        <HighlightOffOutlinedIcon />
                                    </div>
                                    <div className="product-comparison-table__item-header">
                                        <div className="item-header__product-info">
                                            <div className="product-image">
                                                <img src={product.thumbnailUrl} alt={product.name} />
                                            </div>
                                            <div className="product-text">
                                                <div className="product-name">{product.name}</div>
                                            </div>
                                            <div className="actions my-2">
                                                <Button normal onClick={() => handleAddItemToCart(product)}>
                                                    Thêm vào giỏ hàng
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-comparison-table__item-attributes">
                                        <div className="item-attribute">{convertPrice(product.price)} đ</div>
                                    </div>

                                    <div className="product-comparison-table__item-attributes">
                                        <div className="item-attribute ">
                                            <div class="product-attr-name">
                                                <div class="attr-name">Lượt đánh giá</div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center gap-2">
                                                <div className="mt-1">{product.starsNumber}</div>{' '}
                                                <div>
                                                    <StarRateRoundedIcon sx={{ color: '#ffc400' }} />
                                                </div>
                                                <div className="mt-1">({product.totalRating})</div>
                                            </div>
                                        </div>
                                        {product &&
                                            product?.attr?.length > 0 &&
                                            selectedCodes.map((code) => {
                                                const attr = product.attr.find((attr) => attr.code === code);
                                                return (
                                                    <div className="item-attribute" key={code}>
                                                        <div className="product-attr-name">
                                                            <div className="attr-name">{attr ? attr.name : ''}</div>
                                                        </div>
                                                        <div className="d-flex flex-row align-items-center gap-2">
                                                            {attr ? attr.value ?? '' : ''}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    {listProductToCompare && listProductToCompare.length < 4 && (
                        <div className="col-3">
                            <div className="product-comparison-table__add-item">
                                <div
                                    className="icon-plus"
                                    onClick={() => dispatch(handleShowModalAddProductToCompare())}
                                >
                                    <AddCircleOutlineIcon />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ModalAddProductToCompare listProductToCompare={listProductToCompare} />
        </div>
    );
}

export default ComparisonProductBox;
