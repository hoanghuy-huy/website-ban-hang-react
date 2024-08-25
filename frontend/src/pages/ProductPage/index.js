import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOneCategory, fetchProductPaginationWithCategoryId } from '~/redux/features/productSlice/productSlice';
import { useParams } from 'react-router-dom';
import FilterWrapper from '~/components/FilterWrapper';
import CartItem from '~/components/CartItem';
import './Product.scss';

const ProductPage = () => {
    const { loading, error, category, listProductPaginationWithCategory } = useSelector((state) => state.products);

    if (loading === true && error === false) {
        return <div>Loading...</div>;
    } else if (loading === false && error === true) {
        return <div>Error from server</div>;
    }

    return (
        <div className="product-container">
            <div className="title-content">
                <h2>{category?.name}</h2>
            </div>
            <FilterWrapper />
            <div className="container-cart-item d-flex">
                <div className="col-12">
                    <div className="row">
                        {listProductPaginationWithCategory &&
                            listProductPaginationWithCategory?.products?.map((item, index) => {
                                return (
                                    <div className="col-3" key={index}>
                                        <CartItem item={item} />
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
