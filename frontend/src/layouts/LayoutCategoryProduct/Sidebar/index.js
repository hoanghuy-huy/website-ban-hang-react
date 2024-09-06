import React, { useEffect } from 'react';
import Image from '~/components/Image';
import { Link, NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategories, handleSaveCategoryId } from '~/redux/features/categorySlice/categorySlice';
import {
    fetchAllProductBestSellerPaginationWithCategoryId,
    fetchAllProductHotPaginationWithCategoryId,
    fetchOneCategory,
    fetchProductPaginationWithCategoryId,
    handleChangeBrandValueToFilter,
    handleChangeValueSort,
} from '~/redux/features/productSlice/productSlice';
import './Sidebar.scss';

const Sidebar = () => {
    const dispatch = useDispatch();
    const { actionFetchProductCategory, sortValue, minPriceRedux, maxPriceRedux } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchAllCategories());
    }, []);

    const { categoryList } = useSelector((state) => state.categories);

    const handleFetchData = (categoryId, pathCategory) => {
        dispatch(fetchOneCategory(pathCategory.replace('/', '')));
        dispatch(handleChangeBrandValueToFilter([]))
        dispatch(handleSaveCategoryId(categoryId));
        if (actionFetchProductCategory.type === 'fetch all product') {
            dispatch(fetchProductPaginationWithCategoryId({ categoryId, page: 1, limit: 8, sort: sortValue, minPrice: minPriceRedux, maxPrice: maxPriceRedux }));
        } else if (actionFetchProductCategory.type === 'fetch all product hot') {
            dispatch(fetchAllProductHotPaginationWithCategoryId({ categoryId, page: 1, limit: 8, sort: sortValue }));
        } else if (actionFetchProductCategory.type === 'fetch all product best seller') {
            dispatch(
                fetchAllProductBestSellerPaginationWithCategoryId({ categoryId, page: 1, limit: 8, sort: sortValue }),
            );
        }
    };

    return (
        <div className="sidebar-container-LayoutCategoryProduct">
            <div className="title">Danh Mục</div>
            <div>   
                <div className="category-container">
                    {categoryList?.map((item) => {
                        return (
                            <NavLink
                                to={'/products' + item?.path}
                                onClick={() => handleFetchData(item?.id, item?.path)}
                                className={({ isActive, isPending }) =>
                                    isPending ? 'pending' : isActive ? 'active' : ''
                                }
                            >
                                <div className="d-flex gap-3 category__item">
                                    <div className="category__img">
                                        <Image src={item?.urlImg} height={32} width={32} />
                                    </div>
                                    <div className="category__name">{item?.name}</div>
                                </div>
                            </NavLink>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
