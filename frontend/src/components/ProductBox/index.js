import React from 'react';
import './ProductBox.scss';
import CartItem from '../CartItem';
import FilterWrapper from '../FilterWrapper';
import Button from '../Button/Button';
import ReactPaginate from 'react-paginate';

const ProductBox = ({ listProductPagination, handlePageClick, limit }) => {
    const { products } = listProductPagination || {}
    return (
        <div className="product-box-container mt-4">
            <FilterWrapper />
            <div className="col-12">
                <div className="row">
                    {products &&
                        products.length > 0 &&
                        products.map((item, index) => {
                            return (
                                <div className="col-2" key={index}>
                                    <CartItem key={index} item={item} />
                                </div>
                            );
                        })}
                </div>
            </div>
            <div className="content-view-more-btn">
                {limit <= products?.length && (
                    <Button medium outline onClick={() => handlePageClick()}>
                        Xem Thêm
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ProductBox;
