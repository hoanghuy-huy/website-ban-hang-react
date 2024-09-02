import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

import './SidebarFilter.scss';
import { Input, Rating, Typography } from '@mui/material';

const SidebarFilter = () => {
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
                        <div className="checkbox-group">
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Label" />
                                <FormControlLabel control={<Checkbox />} label="Label" />
                                <FormControlLabel control={<Checkbox />} label="Label" />
                                <FormControlLabel control={<Checkbox />} label="Label" />
                            </FormGroup>
                        </div>
                    </div>
                </div>
                <div className="sidebar-filter-group">
                    <div className="sidebar-filter-group__header">Khoảng Giá</div>
                    <div className="sidebar-filter-group__body">
                        <div className="price-range-input-filter d-flex align-items-center justify-content-between mx-3 py-1">
                            <Input placeholder='₫ TỪ' sx={{ fontSize: '0.75rem', width: '4rem'}}/>
                            <div className="price-range-input-line"></div>
                            <Input placeholder='₫ ĐẾN' sx={{ fontSize: '0.75rem', width: '4rem'}}/>
                        </div>
                    </div>
                </div>
                <div className="sidebar-filter-group">
                    <div className="sidebar-filter-group__header">Đánh Giá</div>
                    <div className="sidebar-filter-group__body">
                        <div className="checkbox-group">
                            <div className="d-flex align-items-center">
                                <Rating name="read-only" value={5} readOnly sx={{ fontSize: 20 }} />
                            </div>
                            <div className="d-flex align-items-center">
                                <Rating name="read-only" value={4} readOnly sx={{ fontSize: 20 }} />
                                <span>Trở lên</span>
                            </div>
                            <div className="d-flex align-items-center">
                                <Rating name="read-only" value={3} readOnly sx={{ fontSize: 20 }} />
                                <span>Trở lên</span>
                            </div>
                            <div className="d-flex align-items-center">
                                <Rating name="read-only" value={2} readOnly sx={{ fontSize: 20 }} />
                                <span>Trở lên</span>
                            </div>
                            <div className="d-flex align-items-center">
                                <Rating name="read-only" value={1} readOnly sx={{ fontSize: 20 }} />
                                <span>Trở lên</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidebarFilter;
