import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProductHotPaginationWithCategoryId, fetchProductPaginationWithCategoryId } from '~/redux/features/productSlice/productSlice';

import FilterWrapper from '~/components/FilterWrapper';
import CartItem from '~/components/CartItem';
import './Product.scss';

const ProductPage = () => {
    const { loading, error, category, listProductPaginationWithCategory, actionFetchProductCategory } = useSelector((state) => state.products)
    const { categoryId } = useSelector((state) => state.categories);
    const [currentPage, setCurrentPage] = useState(1)
    const [limit, setLimit] = useState(8)

    const dispatch = useDispatch()
    


    useEffect(() => {
        if (actionFetchProductCategory.type === 'fetch all product') {
            dispatch(fetchProductPaginationWithCategoryId({ categoryId, page: currentPage, limit: limit }));    
        } else if (actionFetchProductCategory.type === 'fetch all product hot') {
            dispatch(fetchAllProductHotPaginationWithCategoryId({ categoryId, page: currentPage, limit: limit }));  
        }
    },[currentPage])

    useEffect(() => {
        if (actionFetchProductCategory.type === 'fetch all product') {
            dispatch(fetchProductPaginationWithCategoryId({ categoryId, page: currentPage, limit: limit }));    
        } else if (actionFetchProductCategory.type === 'fetch all product hot') {
            dispatch(fetchAllProductHotPaginationWithCategoryId({ categoryId, page: currentPage, limit: limit }));    
        }
    },[actionFetchProductCategory])
        
    useEffect(() => {
        setCurrentPage(1)
    }, [categoryId])


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
            <FilterWrapper categoryId={categoryId} totalPages={listProductPaginationWithCategory?.totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} actionFetchProductCategory={actionFetchProductCategory}/>
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
