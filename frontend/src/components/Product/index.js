import React from 'react';
import './Product.scss';
import { Rating } from '@mui/material';
const Product = () => {
    return (
        <div className="product-card">
            <div className="product_wrapperImage">
                <img
                    src="https://salt.tikicdn.com/cache/280x280/ts/product/7d/07/bc/bdfa7929efbb7ad788cd16f349edd15b.png"
                    className="w-100"
                />
            </div>
            <div className="info">
                <span className="d-block brand">Snake</span>
                <h4 className='name'>
                    Nồi áp suất Bear YLB-A50P1 5 L - Đi kèm 2 lòng nồi , 10 công thức nấu ăn, hẹn giờ 24 giờ - Hàng
                    chính hãng , Bản Quốc Tế
                </h4>
            </div>
            <div className="rating">
                <Rating defaultValue={2.5} precision={0.5} readOnly />
            </div>
        </div>
    );
};

export default Product;
