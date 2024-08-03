import React, { useState } from 'react';
import MenuItem from './MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './Menu.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProductWithCategory } from '~/redux/features/productSlice/productSlice';
import { useParams } from 'react-router-dom';

const Menu = ({ item }) => {
    const [showChild, setShowChild] = useState(false);
    const dispatch = useDispatch();
    const handleFetchDataProduct = (pathCategory) => {
        dispatch(fetchAllProductWithCategory(pathCategory));
    };
  
    return (
        <div className="menu py-2">
            <div className="d-flex align-items-center justify-content-between gap-3">
                <MenuItem item={item} className="item-parent" onClick={() => handleFetchDataProduct(item.path)} />
                {item?.ChildCategories.length > 0  && showChild ? (
                    <FontAwesomeIcon icon={faChevronUp} className="icon" onClick={() => setShowChild(!showChild)} />
                ) : (
                    <FontAwesomeIcon icon={faChevronDown} className="icon" onClick={() => setShowChild(!showChild)} />
                )}
            </div>
            {showChild &&
                item.ChildCategories &&
                item.ChildCategories.length > 0 &&
                item.ChildCategories.map((child, index) => {
                    return (
                        <div className="px-3 py-2">
                            <MenuItem
                                item={child}
                                key={index}
                                className="item-child"
                                onClick={() => handleFetchDataProduct(child.path)}
                            />
                        </div>
                    );
                })}
        </div>
    );
};

export default Menu;
