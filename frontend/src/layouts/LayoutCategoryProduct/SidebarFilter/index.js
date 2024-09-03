import React, { useEffect, useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { getAllBrand } from '~/redux/features/brandSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Rating, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './SidebarFilter.scss';

const SidebarFilter = () => {
    const dispatch = useDispatch();
    const { categoryId } = useSelector((state) => state.categories);
    const { brandList } = useSelector((state) => state.brand);
    const [valueRenderBrandList, setValueRenderBrandList] = useState(brandList?.length >= 4 ? 4 : brandList?.length);
    const renderBrandList = () => {
        return brandList.slice(0, valueRenderBrandList).map((item) => {
            return <FormControlLabel control={<Checkbox />} label={item.name} />;
        });
    };

    useEffect(() => {
        setValueRenderBrandList(brandList?.length >= 4 ? 4 : brandList?.length);
        dispatch(getAllBrand(categoryId));
    }, [categoryId]);

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
                            <Input placeholder="₫ TỪ" sx={{ fontSize: '0.75rem', width: '4rem' }} />
                            <div className="price-range-input-line"></div>
                            <Input placeholder="₫ ĐẾN" sx={{ fontSize: '0.75rem', width: '4rem' }} />
                        </div>
                    </div>
                </div>
                <div className="sidebar-filter-group">
                    <div className="sidebar-filter-group__header">Đánh Giá</div>
                    <div className="sidebar-filter-group__body">
                        <div className="checkbox-group">
                            <div className="d-flex align-items-center">
                                <FormControlLabel control={<Checkbox />} className='input'/>
                                <Rating name="read-only" value={4} readOnly sx={{ fontSize: 14 }} />
                                <span className='title'>Từ 4 sao</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidebarFilter;
