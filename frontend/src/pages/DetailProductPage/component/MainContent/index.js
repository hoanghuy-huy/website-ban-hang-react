import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MainContent.scss';
import Sidebar from '../Sidebar';
import CartItem from '~/components/CartItem';
import ComparisonProduct from '../ComparisonProduct';

const MainContent = ({ item, productList, handleFetchData, detailProduct }) => {
    const {ProductImages} = item && item.ProductImages ? item : ''
    if(!item) {
        return <div>error from server.</div>
    }
    return (
        <div className="col-9-md">
            <div className="d-flex">
                <Sidebar listImg={ProductImages} />
                <div className="content-center col-7 ms-3">
                    <div className="information-product-contain">
                        <div className="information-product-body">
                            <div className="brand-styled">
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
                                <h6>
                                    Thương hiệu:
                                    <Link to="#brand">{item?.brandName}</Link>
                                </h6>
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

                    <div className="information-delivery-container mt-3">
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
                    </div>

                    <div className="product-box-container">
                        <div className="title ps-3 py-3">Sản phẩm tương tự</div>
                        <div className="product-box-body">
                            <div className="row mx-3">
                                {productList &&
                                    productList.map((item, index) => {
                                        return (
                                            <div className="col-3" key={index}>
                                                <CartItem item={item} onClick={() => handleFetchData(+item.id)} />
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>

                    {detailProduct && (
                        <div className="detail-info-of-product">
                            <div className="title ms-2 py-3">Thông tin chi tiết</div>
                            <div className="detail-info-of-product__item-contain">
                                {detailProduct.ValueDetailProducts &&
                                    detailProduct.ValueDetailProducts.map((item, index) => {
                                        return (
                                            <div className="item">
                                                <span className="left">{item.name}</span>
                                                <span className="right">{item.value.replace(/<\/?p>/g, '')}</span>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ComparisonProduct />
        </div>
    );
};

export default MainContent;
