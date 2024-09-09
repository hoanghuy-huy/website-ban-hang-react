import React, { useEffect } from 'react';
import Image from '~/components/Image';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategories, handleSaveCategoryId } from '~/redux/features/categorySlice/categorySlice';
import {
    fetchAllProductBestSellerPaginationWithCategoryId,
    fetchAllProductHotPaginationWithCategoryId,
    fetchOneCategory,
    fetchProductPaginationWithCategoryId,

} from '~/redux/features/productSlice/productSlice';


import './Sidebar.scss';

const Sidebar = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllCategories());
    }, []);
    const { actionFetchProductCategory, sortValue, minPriceRedux, maxPriceRedux, brandValueToFilter } = useSelector((state) => state.products);

    const { categoryList } = useSelector((state) => state.categories);
    const listBrandToFilter =  brandValueToFilter.map((item) => item.brandName)

    const handleFetchData = (categoryId, pathCategory) => {
        dispatch(fetchOneCategory(pathCategory.replace('/', '')));
        dispatch(handleSaveCategoryId(categoryId));
        if (actionFetchProductCategory.type === 'fetch all product') {
            dispatch(fetchProductPaginationWithCategoryId({ categoryId, page: 1, limit: 8, sort: sortValue, minPrice: minPriceRedux, maxPrice: maxPriceRedux,brand: listBrandToFilter }));
        } else if (actionFetchProductCategory.type === 'fetch all product hot') {
            dispatch(fetchAllProductHotPaginationWithCategoryId({ categoryId, page: 1, limit: 8, sort: sortValue, minPrice: minPriceRedux, maxPrice: maxPriceRedux,brand: listBrandToFilter }));
        } else if (actionFetchProductCategory.type === 'fetch all product best seller') {
            dispatch(
                fetchAllProductBestSellerPaginationWithCategoryId({ categoryId, page: 1, limit: 8, sort: sortValue, minPrice: minPriceRedux, maxPrice: maxPriceRedux,brand: listBrandToFilter }),
            );
        }
    };

    return (
        <div className="sidebar-container">
            <div className="title">Danh Mục</div>
            <div>
                <div className="category-container">
                    {categoryList?.map((item) => {
                        return (
                            <Link to={'/products' + item?.path} onClick={() => handleFetchData(item?.id, item?.path)} key={item.id}>
                                <div className="d-flex gap-3 category__item">
                                    <div className="category__img">
                                        <Image src={item.urlImg} height={32} width={32} />
                                    </div>
                                    <div className="category__name">{item.name}</div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
