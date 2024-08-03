import React, { useEffect } from 'react';
import MainContent from './component/MainContent';
import BoxBuy from './component/BoxBuy';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOneProduct, fetchProductWithCategory } from '~/redux/features/productSlice/productSlice';
import { useParams } from 'react-router-dom';

import './DetailProductPage.scss';

const DetailProductPage = () => {
    const state = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const { productId } = useParams();
    
    const dataProduct = useSelector((state) => state.products?.product);
    const { product, DetailProduct } = dataProduct || []
    const categoryProduct = useSelector((state) => state.products.categoryProduct);

    useEffect(() => {
        dispatch(fetchOneProduct(+productId));
        dispatch(fetchProductWithCategory(+productId));


        // eslint-disable-next-line
    }, []);

    const handleFetchData = (productId) => {
        dispatch(fetchOneProduct(+productId));
    };

    if (state.loading === true && state.error === false) {
        return <div>Loading...</div>;
    }

    else if (state.loading === false && state.error === true) {
        return <div>Something wrong with server</div>;
    }

    if(!dataProduct) {
        return <div>Loading....</div>
    }

    return (
        <div className="detail-product-container d-flex gap-3">
            <MainContent
                item={product}
                productList={categoryProduct?.Products}
                handleFetchData={handleFetchData}
                detailProduct={DetailProduct}
            />
            <BoxBuy item={product} />
        </div>
    );
};

export default DetailProductPage;
