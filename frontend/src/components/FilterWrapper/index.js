import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useDispatch, useSelector } from 'react-redux';
import PaginationProduct from './PaginationProduct';
import { handleChangeValueSort, handleReassignDataProductCategory } from '~/redux/features/productSlice/productSlice';
import './FilterWrapper.scss';

const FilterWrapper = ({
    currentPage,
    setCurrentPage,
    totalPages,
    categoryId,
    actionFetchProductCategory,
    setSortPrice,
    sortPrice,
    itemSortPrice,
}) => {
    const ITEM_HEIGHT = 30;
    const ITEM_PADDING_TOP = 8;
    const selectedfilterprice = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    // const { descendingPrice, ascendingPrice } = useSelector((state) => state.products);

    // const itemSortPrice = ['Giá', descendingPrice, ascendingPrice];

    function getStyles(item, sortPrice, theme) {
        return {
            fontWeight:
                sortPrice.indexOf(item) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
        };
    }

    const theme = useTheme();

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        dispatch(handleChangeValueSort(value));

        setSortPrice(typeof value === 'string' ? value.split(',') : value);
    };
    const dispatch = useDispatch();
    const fetchDataCategoryProductPage = (type) => {
        dispatch(handleReassignDataProductCategory(type));
        setCurrentPage(1);
    };

    return (
        <div className="filter-wrapper-container mt-4">
            <div className="col-12">
                <div className="row d-flex align-items-center">
                    <div className="btn-filter__label col-1">Sắp xếp theo</div>
                    <div className="btn-filter col-8">
                        <div className="btn-filter__sort-by-options">
                            <section className="sort-by-options__option-group">
                                <Button
                                    className={
                                        actionFetchProductCategory.type === 'fetch all product'
                                            ? 'sort-by-options__option active'
                                            : 'sort-by-options__option'
                                    }
                                    onClick={() => fetchDataCategoryProductPage({ type: 'dataAllProduct' })}
                                >
                                    <span>Phổ biến</span>
                                </Button>
                                <Button
                                    className={
                                        actionFetchProductCategory.type === 'fetch all product best seller'
                                            ? 'sort-by-options__option active'
                                            : 'sort-by-options__option'
                                    }
                                    onClick={() => fetchDataCategoryProductPage({ type: 'dataAllProductBestSeller' })}
                                >
                                    <span>Bán chạy</span>
                                </Button>
                                <Button
                                    className={
                                        actionFetchProductCategory.type === 'fetch all product hot'
                                            ? 'sort-by-options__option active'
                                            : 'sort-by-options__option'
                                    }
                                    onClick={() => fetchDataCategoryProductPage({ type: 'dataAllProductHot' })}
                                >
                                    <span>Chính hãng</span>
                                </Button>
                                <div className="sort-by-options__option-select">
                                    <FormControl sx={{ m: 1, width: 300, mt: 3 }} size="small">
                                        <Select
                                            value={sortPrice}
                                            onChange={handleChange}
                                            input={<OutlinedInput />}
                                            selectedfilterprice={selectedfilterprice}
                                            inputProps={{ 'aria-label': 'Without label' }}
                                        >
                                            {itemSortPrice.map((item) => (
                                                <MenuItem
                                                    key={item}
                                                    value={item}
                                                    style={getStyles(item, sortPrice, theme)}
                                                >
                                                    {item}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* pagination here */}
                    <PaginationProduct
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterWrapper;
