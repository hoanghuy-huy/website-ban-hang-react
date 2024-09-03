import React, { useEffect } from 'react';
import Image from '~/components/Image';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategories, handleSaveCategoryId } from '~/redux/features/categorySlice/categorySlice';
import { fetchAllProductHotPaginationWithCategoryId, fetchOneCategory, fetchProductPaginationWithCategoryId } from '~/redux/features/productSlice/productSlice';
import './Sidebar.scss';

const Sidebar = () => {
    const dispatch = useDispatch();
    const { actionFetchProductCategory } = useSelector((state) => state.products)

    useEffect(() => {
        dispatch(fetchAllCategories());
    }, []);

    const { categoryList } = useSelector((state) => state.categories);

    const handleFetchData = (categoryId, pathCategory) => {
        dispatch(fetchOneCategory(pathCategory.replace('/', '')));
        dispatch(handleSaveCategoryId(categoryId))
        if (actionFetchProductCategory.type === 'fetch all product') {
            dispatch(fetchProductPaginationWithCategoryId({ categoryId, page: 1, limit: 8 }));    
        } else if (actionFetchProductCategory.type === 'fetch all product hot') {
            dispatch(fetchAllProductHotPaginationWithCategoryId({ categoryId, page: 1, limit: 8 }));  
        }
    };


    return (
        <div className="sidebar-container-LayoutCategoryProduct">
            <div className="title">Danh Mục</div>
            <div>
                <div className="category-container">
                    {categoryList?.map((item) => {
                        return (
                            <Link to={'/products' + item?.path} onClick={() => handleFetchData(item?.id, item?.path)}>
                                <div className="d-flex gap-3 category__item">
                                    <div className="category__img">
                                        <Image src={item?.urlImg} height={32} width={32} />
                                    </div>
                                    <div className="category__name">{item?.name}</div>
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
