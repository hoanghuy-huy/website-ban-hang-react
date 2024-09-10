import React, { useEffect } from 'react';
import MainContent from './component/MainContent';
import BoxBuy from './component/BoxBuy';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOneProduct, fetchProductPaginationWithCategoryId, fetchProductWithCategory } from '~/redux/features/detailProductSlice';
import { useParams } from 'react-router-dom';

import './DetailProductPage.scss';

const DetailProductPage = () => {
    const dispatch = useDispatch();
    const { productId } = useParams();
    
    const { error, loading, product, DetailProduct, categoryProduct, categoryId } = useSelector((state) => state.detailProduct);
    useEffect(() => {
        dispatch(fetchOneProduct(+productId));
        dispatch(fetchProductWithCategory(+productId));

        // eslint-disable-next-line
    }, []);

    useEffect(() => {

        dispatch(fetchProductPaginationWithCategoryId({ limit: 5, page: 1, categoryId: categoryId }));

        // eslint-disable-next-line
    }, [categoryId]);

    const handleFetchData = (productId) => {
        dispatch(fetchOneProduct(+productId));
    };

    if (loading === true && error === false) {
        return <div>Loading...</div>;
    }

    else if (loading === false && error === true) {
        return <div>Something wrong with server</div>;
    }

    return (

        <div className="detail-product-container d-flex gap-3">
            <MainContent
                item={product?.product}
                productList={categoryProduct?.Products}
                handleFetchData={handleFetchData}
                detailProduct={DetailProduct}
            />
            <BoxBuy item={product?.product} />
        </div>
    );
};

export default DetailProductPage;
