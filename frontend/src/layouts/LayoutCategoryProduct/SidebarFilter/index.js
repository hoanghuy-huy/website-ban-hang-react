import React, { useEffect, useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { getAllBrand } from '~/redux/features/brandSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Rating, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import _ from 'lodash'
import './SidebarFilter.scss';
import {
    handleChangeBrandValueToFilter,
    handleChangeStarNumberCheckBoxValue,
    handleFetchDataWithFilterPrice,
} from '~/redux/features/productSlice/productSlice';
import { useParams } from 'react-router-dom';

const SidebarFilter = () => {
    const dispatch = useDispatch();
    const { categoryId } = useSelector((state) => state.categories);
    const { brandList } = useSelector((state) => state.brand);
    const { starNumberCheckBoxValue, minPriceRedux, maxPriceRedux, brandValueToFilter, listProductPaginationWithCategory } = useSelector((state) => state.products);
    const [valueRenderBrandList, setValueRenderBrandList] = useState(brandList?.length >= 4 ? 4 : brandList?.length);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [errorInputPrice, setErrorInputPrice] = useState(false);
    const [brand, setBrand] = useState([])
    const checkedBrandListFilter = brandValueToFilter.map((item) => item?.brandName)
    const  { categories } = useParams()
    const renderBrandList = () => {
        return brandList.slice(0, valueRenderBrandList).map((item,index) => {
            return <FormControlLabel control={<Checkbox checked={checkedBrandListFilter.includes(item.name)} onChange={(e) => handleSaveFilterBrandValue({brandName: item?.name, checked: e.target.checked, index})}/>} label={item.name} />;
        });
    };
    
    const handleOnChangeStarNumberCheckBox = (e) => {
        dispatch(handleChangeStarNumberCheckBoxValue(e.target.checked));
    };

    const handleChangeMinPrice = (value) => {
        if (!isNaN(value) && !value.includes(' ') && !value.startsWith(0)) {
            setMinPrice(value);
        }
    };

    const handleChangeMaxPrice = (value) => {
        if (!isNaN(value) && !value.includes(' ') && !value.startsWith(0)) {
            setMaxPrice(value);
        }
    };
    const handleFilterPrice = () => {
        if (+minPrice < 0 || +maxPrice <= 0  || +minPrice >= +maxPrice) {
            setErrorInputPrice(true);
        } else {
            dispatch(handleFetchDataWithFilterPrice({ minPrice, maxPrice }));
            setErrorInputPrice(false);
        }
    };

    useEffect(() => {
        setValueRenderBrandList(brandList?.length >= 4 ? 4 : brandList?.length);
        dispatch(getAllBrand(categoryId));
        setBrand([])
    }, [categoryId]);

    // useEffect(() => {
    //     setBrand([])
    // }, [listProductPaginationWithCategory]);

    useEffect(() => {
        setMinPrice(minPriceRedux);
        setMaxPrice(maxPriceRedux);
        setBrand(brandValueToFilter);
    }, []);

    const handleSaveFilterBrandValue = ({brandName,checked, index}) => {
        setBrand((preBrand) => {
            if (checked) {
                if (!preBrand?.brandName?.includes(brandName)) {
                    return [...preBrand, { brandName : brandName, index: index}];
                }
                return preBrand;
            } else {
                return preBrand.filter(brand => brand.brandName !== brandName);
            }
        });
    }

    
    useEffect(() => {
        dispatch(handleChangeBrandValueToFilter(brand))
    },[brand])



    return (
        <div className="sidebar-filter">
            <div className="sidebar-filter-container">
                <div className="sidebar-filter__title my-2">    
                    <FilterAltOutlinedIcon />
                    Bộ lọc tìm kiếm
                </div>
                <div className="sidebar-filter-group">
                    <div className="sidebar-filter-group__header">Thương Hiệu</div>
                    <div className="sidebar-filter-group__body">
                        <div className="checkbox-group d-flex flex-column justify-content-center">
                            <FormGroup>{renderBrandList()}</FormGroup>
                            {brandList?.length > 4 && valueRenderBrandList <= 4 && (
                                <div
                                    className="ps-2 pb-2 cursor"
                                    onClick={() => setValueRenderBrandList(brandList?.length)}
                                >
                                    Thêm <ExpandMoreIcon></ExpandMoreIcon>
                                </div>
                            )}
                            {valueRenderBrandList > 4 && (
                                <div
                                    className="ps-2 pb-2 cursor"
                                    onClick={() =>
                                        setValueRenderBrandList(brandList?.length >= 4 ? 4 : brandList?.length)
                                    }
                                >
                                    Ẩn Bớt <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="sidebar-filter-group">
                    <div className="sidebar-filter-group__header">Khoảng Giá</div>
                    <div className="sidebar-filter-group__body">
                        <div className="price-range-input-filter d-flex align-items-center justify-content-between mx-3 py-1">
                            <Input
                                placeholder="₫ TỪ"
                                sx={{ fontSize: '0.75rem', width: '4rem' }}
                                value={minPrice}
                                onChange={(e) => handleChangeMinPrice(e.target.value)}
                            />
                            <div className="price-range-input-line"></div>
                            <Input
                                placeholder="₫ ĐẾN"
                                sx={{ fontSize: '0.75rem', width: '4rem' }}
                                value={maxPrice}
                                onChange={(e) => handleChangeMaxPrice(e.target.value)}
                            />
                        </div>
                        {errorInputPrice && (
                            <div className="price-range-input-filter__error">Vui lòng điền khoảng giá phù hợp</div>
                        )}
                        <Button
                            sx={{ width: '90%', marginRight: 10, marginTop: 1, marginBottom: 2 }}
                            variant="outlined"
                            onClick={() => handleFilterPrice()}
                        >
                            Áp Dụng
                        </Button>
                    </div>
                </div>
                <div className="sidebar-filter-group">
                    <div className="sidebar-filter-group__header">Đánh Giá</div>
                    <div className="sidebar-filter-group__body">
                        <div className="checkbox-group">
                            <div className="d-flex align-items-center">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={(e) => handleOnChangeStarNumberCheckBox(e)}
                                            checked={starNumberCheckBoxValue}
                                        />
                                    }
                                    className="input"
                                />
                                <Rating name="read-only" value={4} readOnly sx={{ fontSize: 14 }} />
                                <span className="title">Từ 4 sao</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidebarFilter;
