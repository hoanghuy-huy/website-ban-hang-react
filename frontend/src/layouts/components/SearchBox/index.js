import React, { useEffect, useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import SearchItem from '~/components/SearchItem';
import './SearchBox.scss';
import { apiSearchUser } from '~/services/testService';
import { useDebounce } from '~/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { saveKeywordSearch, searchAllProductApi, searchKeywordProductApi } from '~/redux/features/productSlice/productSlice';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import axios from 'axios';

import { Backdrop, CircularProgress } from '@mui/material';

const SearchBox = () => {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const valueDebounce = useDebounce(searchValue, 600);
    const listKeywordSearch = useSelector((state) => state.products.listKeywordSearch)
    const refInput = useRef();
    console.log(listKeywordSearch)
    const [loadingApi, setLoadingApi] = useState(false);

    const labels = [
        'Bàn Ủi',
        'Bình đung siêu tốc',
        'Lò vi sống',
        'Máy hút bụi',
        'Máy lọc không khí',
        'Nồi cơm điện',
        'Quạt',
    ];

    const handleOnChangeResultValue = (searchValue) => {
        if (searchValue.startsWith(' ')) {
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

    // const fetchData = async () => {
    //     setLoading(true);
    //     const res = await apiSearchUser(searchValue);

    //     setSearchResult(res.data.data);
    //     setLoading(false);
    // };

    useEffect(() => {
        // if (!valueDebounce.trim()) {
        //     return;
        // }
        // fetchData();
        dispatch(searchKeywordProductApi({ keyword: valueDebounce, page: 1, limit: 10 }));
        // eslint-disable-next-line
    }, [valueDebounce]);

    const handleSearchItem = async () => {
        if (!valueDebounce.trim()) {
            return;
        }
        await dispatch(searchAllProductApi({ keyword: searchValue, page: 1, limit: 8 }));
        await dispatch(saveKeywordSearch(searchValue));
        navigate('/search');
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            uploadFile(file);
        }
    };

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        setLoadingApi(true);
        try {
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (data && data.class) {
                let label = labels[data.class];
                if (label) {
                    await dispatch(searchAllProductApi({ keyword: label, page: 1, limit: 8 }));
                    await dispatch(saveKeywordSearch(label));
                    navigate('/search');
                    console.log(label)
                }
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setLoadingApi(false);
        }
    };

    return (
        <>
            <Tippy
                appendTo={document.body}
                onClickOutside={handleHideSearchResult}
                visible={showResult}
                interactive={true}
                render={(attrs) => (
                    <div className="search-result-box" tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            {listKeywordSearch &&
                                listKeywordSearch?.products?.length > 0 &&
                                listKeywordSearch?.products?.map((item, index) => {
                                    return <SearchItem key={index} data={item.name} />;
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
                        className="position-absolute top-50 end-0 translate-middle-y clear-icon"
                        onClick={() => handleOnClickClearSearchValue()}
                    >
                        {!loading && searchValue.length > 0 && <CloseIcon />}
                    </div>

                    <div
                        className="position-absolute top-50 end-0 translate-middle-y cam-icon mt-1"
                        onClick={() => handleOnClickClearSearchValue()}
                    >
                        {!loading && searchValue.length === 0 && (
                            <label>
                                <CameraAltIcon />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                    acceptedFiles={['image/*']}
                                    filesLimit={1}
                                />
                            </label>
                        )}
                    </div>

                    <button className="search-btn pe-2 " onClick={handleSearchItem}>
                        Tìm Kiếm
                    </button>
                </div>
            </Tippy>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loadingApi}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
};

export default SearchBox;
