import React, { useEffect } from 'react';
import Image from '~/components/Image';
import { Link, useParams } from 'react-router-dom';
import './Sidebar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategories } from '~/redux/features/categorySlice/categorySlice';
import { fetchOneCategory, fetchProductPaginationWithCategoryId } from '~/redux/features/productSlice/productSlice';

const Sidebar = () => {
    const dispatch = useDispatch();
    const { categories } = useParams();

    useEffect(() => {
        dispatch(fetchAllCategories());
    }, []);
    const { category } = useSelector((state) => state.products);

    const { categoryList } = useSelector((state) => state.categories);

    const handleFetchData = (categoryId, pathCategory) => {
        dispatch(fetchOneCategory(pathCategory.replace("/","")))
        dispatch(fetchProductPaginationWithCategoryId({ categoryId, page: 1, limit: 8 }));
    };

    return (
        <div className="sidebar-container">
            <div className="title">Danh Mục</div>
            <div>
                <div className="category-container">
                    {categoryList?.map((item) => {
                        return (
                            <Link to={'/products' + item?.path} onClick={() => handleFetchData(item?.id, item?.path)}>
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
