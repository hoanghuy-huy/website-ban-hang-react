import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';
import SimilarProductBox from '../SimilarProductBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';

import ComparisonProduct from './ComparisonProduct';
import { handleDeleteItemCompare, handleShowFromCompare } from '~/redux/features/detailProductSlice';
import Button from '~/components/Button/Button';
import './MainContent.scss';
import ModalAddProductToCompare from './ModalAddProductToCompare';
const MainContent = ({ item, productList, handleFetchData, detailProduct }) => {
    const { ProductImages } = item && item.ProductImages ? item : '';
    const { showFormCompare, listProductToCompare, showFormShrinkCompare } = useSelector(
        (state) => state.detailProduct,
    );
    const dispatch = useDispatch();
    const checkedCompare = () => {
        const check = listProductToCompare.some((product) => product.id === item.id);

        return check;
    };

    if (!item) {
        return <div>error from server.</div>;
    }

    return (
        <div className="col-9-md">
            <div className="d-flex">
                <Sidebar listImg={ProductImages} />
                <div className="content-center col-7 ms-3">
                    <div className="information-product-contain">
                        <div className="information-product-body">
                            <div className="brand-styled d-flex align-items-center">
                                {item?.hot && (
                                    <img
                                        src="https://salt.tikicdn.com/ts/upload/0f/59/82/795de6da98a5ac81ce46fb5078b65870.png"
                                        alt="img-genuine"
                                    />
                                )}
                                {item?.authentic && (
                                    <img
                                        src="https://salt.tikicdn.com/ts/upload/d7/56/04/b93b8c666e13f49971483596ef14800f.png"
                                        alt="img-genuine"
                                    />
                                )}
                                <div>
                                    Thương hiệu:
                                    <Link to="#brand">{item?.brandName}</Link>
                                </div>
                                {checkedCompare() ? (
                                    <div
                                        className="comparison-icon d-flex align-items-center ms-1 gap-1"
                                        onClick={() => dispatch(handleDeleteItemCompare(item))}
                                    >
                                        <FontAwesomeIcon icon={faCheck} />
                                        <span>Đã thêm</span>
                                    </div>
                                ) : (
                                    <div
                                        className="comparison-icon d-flex align-items-center ms-1 gap-1"
                                        onClick={() => dispatch(handleShowFromCompare(item))}
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                        <span>So sánh</span>
                                    </div>
                                )}
                            </div>
                            <div className="title-styled">{item?.name}</div>
                            <div className="rating-styled">
                                {item && item?.quantitySold > 0 && (
                                    <div className="quantity-sold">
                                        Số lượng đã bán
                                        {item?.quantitySold}
                                    </div>
                                )}
                            </div>
                            <div className="product-price">
                                <div className="product-price__current-price">
                                    {item?.price.toLocaleString('vi-VN', {
                                        maximumFractionDigits: 0,
                                    })}
                                    <sup>₫</sup>
                                </div>
                                {item.discountRate > 0 && (
                                    <div className="product-price__discount-rate">-{item?.discountRate}%</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* <div className="information-delivery-container mt-3">
                        <div className="information-delivery__header">Thông tin vận chuyển</div>
                        <div className="information-delivery__place-of-delivery">
                            Giao đến TP. Quảng Ngãi, P. Trần Phú, Quảng Ngãi
                            <span>Đổi</span>
                        </div>
                        <div className="information-delivery__shipping-information">
                            <div className="shipping-information__header">
                                <div className="shipping-information__header-icon"></div>
                                <div className="shipping-information__header_content">Giao Thứ Sáu</div>
                            </div>
                            <div className="shipping-information__body">
                                <span>Trước 19h, 29/07: 7.000</span>
                            </div>
                        </div>
                    </div> */}
            
                    <SimilarProductBox productList={productList} handleFetchData={handleFetchData} />

                    {detailProduct && (
                        <div className="detail-info-of-product">
                            <div className="title ms-2 py-3">Thông tin chi tiết</div>
                            <div className="detail-info-of-product__item-contain">
                                <div className="item">
                                    <span className="left">Thương hiệu</span>
                                    <span className="right">{detailProduct?.brand ?? '--'}</span>
                                </div>
                                <div className="item">
                                    <span className="left">Xuất xứ thương hiệu</span>
                                    <span className="right">{detailProduct?.brandCountry ?? '--'}</span>
                                </div>
                                <div className="item">
                                    <span className="left">Dung tích</span>
                                    <span className="right">{detailProduct?.capacity ?? '--'}</span>
                                </div>
                                <div className="item">
                                    <span className="left">Chất liệu</span>
                                    <span className="right">{detailProduct?.material ?? '--'}</span>
                                </div>
                                <div className="item">
                                    <span className="left">Công suất</span>
                                    <span className="right">{detailProduct?.power ?? '--'}</span>
                                </div>
                                <div className="item">
                                    <span className="left">Xuất xứ (Made in)</span>
                                    <span className="right">{detailProduct?.origin ?? '--'}</span>
                                </div>
                                <div className="item">
                                    <span className="left">Trọng lượng sản phẩm</span>
                                    <span className="right">{detailProduct?.productWeight ?? '--'}</span>
                                </div>
                                <div className="item">
                                    <span className="left">Chế độ an toàn</span>
                                    <span className="right">{detailProduct?.safeMode ?? '--'}</span>
                                </div>
                                <div className="item">
                                    <span className="left">Chế độ hẹn giờ</span>
                                    <span className="right">{detailProduct?.timer ?? '--'}</span>
                                </div>
                                <div className="item">
                                    <span className="left">Sản phẩm có được bảo hành không?</span>
                                    <span className="right">{detailProduct?.isWarrantyApplied ?? '--'}</span>
                                </div>
                                <div className="item">
                                    <span className="left">Thời gian bảo hành</span>
                                    <span className="right">{detailProduct?.warrantyTimePeriod ?? '--'}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {showFormCompare && <ComparisonProduct />}
            {listProductToCompare.length > 0 && showFormShrinkCompare && !showFormCompare && (
                <div className="shrink-compare-form">
                    <div className="show-more" onClick={() => dispatch(handleShowFromCompare())}>
                        <Button rounded outline>
                            So Sánh ({listProductToCompare?.length})
                        </Button>
                    </div>
                </div>
            )}


            <ModalAddProductToCompare />
        </div>
    );
};

export default MainContent;
