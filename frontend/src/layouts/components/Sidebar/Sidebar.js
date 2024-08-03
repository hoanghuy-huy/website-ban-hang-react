import React, { useEffect } from 'react';
import Menu from './Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategories } from '~/redux/features/categorySlice/categorySlice';

const Sidebar = () => {
    const dispatch = useDispatch();

    const data = useSelector((state) => state.categories.categoryList);
    
    useEffect(() => {
        dispatch(fetchAllCategories());
        // eslint-disable-next-line
    }, []);
    return (
        <aside className="side-bar">
            <div className="category-heading pb-2">
                <FontAwesomeIcon icon={faList} className="px-2" />
                Danh Mục
            </div>
            <div className="category-body px-2">
                {data && data.length > 0 &&
                    data.map((item, index) => {
                        return <Menu item={item} key={index} />;
                    })}
            </div>
        </aside>
    );
};

export default Sidebar;
