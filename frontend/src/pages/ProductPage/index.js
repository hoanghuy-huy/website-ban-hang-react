import React, { useEffect } from 'react';
import './Product.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProductWithCategory } from '~/redux/features/productSlice/productSlice';
import { useParams } from 'react-router-dom';
import FilterWrapper from '~/components/FilterWrapper';
import CartItem from '~/components/CartItem';

const ProductPage = () => {
    const products = useSelector((state) => state.products.productList);

    const productState = useSelector((state) => state.products);
    const { categories } = useParams();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchAllProductWithCategory(categories));
        // eslint-disable-next-line
    }, []);

    if (productState.loading === true && productState.error === false) {
        return <div>Loading...</div>;
    } else if (productState.loading === false && productState.error === true) {
        return <div>Error from server</div>;
    }

    return (
        <div className="product-container">
            <div className="title-content">
                <h2>{products?.name}</h2>
            </div>
            <FilterWrapper />
            <div className="container-cart-item d-flex">
                <div className="col-12">
                    <div className="row">
                        {products &&
                            products?.Products.map((item, index) => {
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
