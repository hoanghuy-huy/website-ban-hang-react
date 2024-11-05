import React, { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton, Tooltip } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import Image from '~/components/Image';
import StarIcon from '@mui/icons-material/Star';
import Pagination from '@mui/material/Pagination';

import './TableProduct.scss';

const TableRevenueProduct = ({}) => {
    return (
        <div className="card-product shadow border-0 p-3 mt-4 mb-5 bg-white rounded-2">
            <h3>Danh thu</h3>
            <div className="row card-filter mt-3">
                <div className="col-md-4">
                    <h4>Tháng</h4>
                    <FormControl sx={{ m: 1, minWidth: 120, width: '100%' }} size="small">
                        <Select displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem></MenuItem>;
                        </Select>
                    </FormControl>
                </div>
                <div className="col-md-4">
                    <h4>Năm</h4>
                    <FormControl sx={{ m: 1, minWidth: 120, width: '100%' }} size="small">
                        <Select displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem></MenuItem>;
                        </Select>
                    </FormControl>
                </div>
            </div>

            <div className="table-product">
                <table class="table table-striped table-hover">
                    <thead className="table-primary">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">THÁNG/NĂM</th>
                            <th scope="col">TỔNG DANH THU</th>
                            <th scope="col">SỐ LƯỢNG ĐÃ BÁN</th>
                            <th scope="col">TRẢ HÀNG</th>
                            <th scope="col">TƯƠNG TÁC</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#1</td>
                            <td>#1</td>
                            <td>#1</td>
                            <td>#1</td>
                            <td>#1</td>

                            <td>
                                <div className="actions d-flex justify-content-start">
                                    {/* <Tooltip title="Xem sản phẩm">
                                                    <Button className="view" color="secondary">
                                                        <VisibilityIcon />
                                                    </Button>
                                                </Tooltip> */}
                                    <Tooltip title="chỉnh sửa sẩn phẩm">
                                        <Button className="edit" color="warning">
                                            <CreateIcon />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="xóa sản phẩm">
                                        <Button className="delete" color="error">
                                            <DeleteIcon />
                                        </Button>
                                    </Tooltip>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {/* <div className="table-footer">
                    {listProductPagination && listProductPagination.totalPages !== 0 && (
                        <>
                            <div>
                                Trang
                                <strong> {currentPage} </strong>
                                <span className="divide">/ </span>
                                {listProductPagination?.totalPages}
                            </div>
                            <Pagination
                                onChange={handleChange}
                                page={currentPage}
                                count={listProductPagination?.totalPages}
                                variant="outlined"
                                shape="rounded"
                            />
                        </>
                    )}
                </div> */}
            </div>
        </div>
    );
};

export default TableRevenueProduct;
