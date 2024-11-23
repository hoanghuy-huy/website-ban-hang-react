import React, { useEffect, useState } from 'react';
import './ImportProductPage.scss';
import { FormControl, MenuItem, Select, TextField } from '@mui/material';
import { fetchAllProductPagination } from '~/redux/features/productSlice/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
const ImportProductPage = () => {
    const [limit, setLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const listProductPagination = useSelector((state) => state.products.listProductPagination);
    console.log(listProductPagination);
    useEffect(() => {
        dispatch(fetchAllProductPagination({ page: currentPage, limit: limit }));
    }, []);
    return (
        <div className="ImportProductPage">
            <div className="ImportProductPage-container">
                <div className="title">Quản lý nhập hàng</div>
                <div className="content">
                    <div className="row card-filter mt-2 bg-white">
                        <h4 className="mt-2">Lọc sản phẩm theo</h4>
                        <div className="col-md-3 mb-2 selected-item">
                            <TextField size="small" label="Id sản phẩm" type="text" autoComplete="current-password" />
                        </div>

                        <div className="col-md-3 mb-2 selected-item">
                            <TextField size="small" label="Tên sản phẩm" type="text" autoComplete="current-password" />
                        </div>
                        <div className="col-md-3 mb-2 selected-item pt-0">
                            <FormControl size="small" sx={{ m: 1, minWidth: 120, width: '100%' }}>
                                <Select displayEmpty defaultValue={''} inputProps={{ 'aria-label': 'Without label' }}>
                                    <MenuItem value="">
                                        <em>Số lượng trong kho</em>
                                    </MenuItem>
                                    <MenuItem value="1">
                                        <em>Hết hàng</em>
                                    </MenuItem>
                                    <MenuItem value="1">
                                        <em>Dưới 10</em>
                                    </MenuItem>
                                    <MenuItem value="1">
                                        <em>Dưới 100</em>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className="col-md-3 mb-2 selected-item pt-0 d-flex align-items-center">
                            <div className="btn-search">
                                <Button sx={{ backgroundColor: 'var(--primary-color)', color: '#fff' }}>Tìm</Button>
                            </div>
                        </div>
                    </div>
                    <div className="table-product">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Tên sảm phẩm</th>
                                    <th scope="col">Số lượng trong kho</th>
                                    <th scope="col">Xử lý</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listProductPagination && listProductPagination.products.length > 0 ? (
                                    listProductPagination.products.map((product) => {
                                        return (
                                            <>
                                                <tr>
                                                    <th scope="row">{product.id}</th>
                                                    <td className="info">
                                                        <h6>{product.name}</h6>
                                                    </td>
                                                    <td>{product.inventoryNumber}</td>
                                                    <td>
                                                        <div className="btn-action">
                                                            <Button
                                                                sx={{
                                                                    backgroundColor: 'var(--primary-color)',
                                                                    color: '#fff',
                                                                }}
                                                            >
                                                                Nhập hàng
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </>
                                        );
                                    })
                                ) : (
                                    <></>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImportProductPage;
