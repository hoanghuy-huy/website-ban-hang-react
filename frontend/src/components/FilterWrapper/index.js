import React, { useState } from 'react';
import { Button, Icon, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import './FilterWrapper.scss';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';

const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 8;
const SelectedFilterPrice = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const itemSortPrice = ['Giá', 'Giá : Cao đến Thấp', 'Giá : Thấp đến Cao'];

function getStyles(item, sortPrice, theme) {
    return {
        fontWeight:
            sortPrice.indexOf(item) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
    };
}

const FilterWrapper = () => {
    const theme = useTheme();
    const [sortPrice, setSortPrice] = useState(itemSortPrice[0] || []);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSortPrice(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const [page, setPage] = React.useState(2);
    const [rowsPerPage, setRowsPerPage] = React.useState(1);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className="filter-wrapper-container mt-4">
            <div className="col-12">
                <div className="row d-flex align-items-center">
                    <div className="btn-filter__label col-1">Sắp xếp theo</div>
                    <div className="btn-filter col-8">
                        <div className="btn-filter__sort-by-options">
                            <section className="sort-by-options__option-group">
                                <Button className="sort-by-options__option active">
                                    <span>Phổ biến</span>
                                </Button>
                                <Button className="sort-by-options__option">
                                    <span>Mới nhất</span>
                                </Button>
                                <Button className="sort-by-options__option">
                                    <span>Chính hãng</span>
                                </Button>
                                <div className="sort-by-options__option-select">
                                    <FormControl sx={{ m: 1, width: 300, mt: 3 }} size="small">
                                        <Select
                                            value={sortPrice}
                                            onChange={handleChange}
                                            input={<OutlinedInput />}
                                            SelectedFilterPrice={SelectedFilterPrice}
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
                    <div className="btn-pagination col-2 d-flex align-items-center justify-content-end">
                        <div className="btn-pagination__state">
                            <span className="btn-pagination__current-page"> 1</span>/
                            <span className="btn-pagination__total-page">2</span>
                        </div>
                        <div className="btn-pagination-style btn-pagination__previous-page">
                            <IconButton>
                                <NavigateBefore />
                            </IconButton>
                        </div>
                        <div className="btn-pagination-style btn-pagination__next-page">
                            <IconButton>
                                <NavigateNext />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterWrapper;
