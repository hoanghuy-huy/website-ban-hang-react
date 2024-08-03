import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './SearchItem.scss';

const SearchItem = ({ data }) => {
    return (
        <div className="search-item gap-1">
            <div className="icon-search">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>

            <div className="result-search">
                <span>{data}</span>
            </div>
        </div>
    );
};

export default SearchItem;
