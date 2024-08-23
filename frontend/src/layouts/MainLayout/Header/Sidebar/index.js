import React, { useEffect } from 'react';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';
import './Sidebar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategories } from '~/redux/features/categorySlice/categorySlice';

const Sidebar = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllCategories());
    }, []);

    const { categoryList } = useSelector((state) => state.categories);

    return (
        <div className="sidebar-container">
            <div className="title">Danh Mục</div>
            <div>
                <div className="category-container">
                    {categoryList?.map((item) => {
                        return (
                            <Link>
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
