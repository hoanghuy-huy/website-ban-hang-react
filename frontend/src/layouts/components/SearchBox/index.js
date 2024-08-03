import React, { useEffect, useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import SearchItem from '~/components/SearchItem';
import './SearchBox.scss';
import { apiSearchUser } from '~/services/testService';
import { useDebounce } from '~/hooks';

const SearchBox = () => {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const valueDebounce = useDebounce(searchValue, 600)





    const refInput = useRef();

    const handleOnChangeResultValue = (searchValue) => {
        if(searchValue.startsWith(' ')) {
            return;
        }
        setSearchValue(searchValue);
    };

    const handleOnClickClearSearchValue = () => {
        setSearchValue('');
        refInput.current.focus();
    };

    const handleHideSearchResult = () => {
        setShowResult(false);
    };

    const fetchData = async () => {
        setLoading(true);
        const res = await apiSearchUser(searchValue);

        setSearchResult(res.data.data);
        setLoading(false);
    };

    useEffect(() => {
        if (!valueDebounce.trim()) {
            return;
        }
        fetchData();
        // eslint-disable-next-line
    }, [valueDebounce]);

    return (
        <Tippy
            appendTo={document.body}
            onClickOutside={handleHideSearchResult}
            visible={showResult}
            interactive={true}
            render={(attrs) => (
                <div className="search-result-box" tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        {searchResult &&
                            searchResult.length > 0 &&
                            searchResult.map((item, index) => {
                                return <SearchItem key={index} data={item.full_name} />;
                            })}
                    </PopperWrapper>
                </div>
            )}
        >
            <div className="search-box col-6 rounded-2 position-relative">
                <div className="ps-3">
                    {' '}
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <input
                    className="input-search ps-3"
                    placeholder="Bạn tìm gì hôm nay"
                    spellCheck={false}
                    value={searchValue}
                    ref={refInput}
                    onChange={(event) => handleOnChangeResultValue(event.target.value)}
                    onFocus={() => setShowResult(true)}
                />

                <div className=" position-absolute top-50 end-0 translate-middle-y me-5">
                    {loading && <FontAwesomeIcon className="loading-icon" icon={faSpinner} />}
                </div>

                <div
                    className="position-absolute top-50 end-0 translate-middle-y"
                    onClick={() => handleOnClickClearSearchValue()}
                >
                    {!loading && searchValue.length > 0 && (
                        <FontAwesomeIcon className="clear-icon me-5" icon={faXmark} />
                    )}
                </div>

                <button className="search-btn pe-2 ">Search</button>
            </div>
        </Tippy>
    );
};

export default SearchBox;
