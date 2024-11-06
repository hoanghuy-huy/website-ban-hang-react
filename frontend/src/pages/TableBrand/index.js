import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton, Tooltip } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import Pagination from '@mui/material/Pagination';
import './TableProduct.scss';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBrandApi, getAllBrand, getAllBrandPaginationAdmin } from '~/redux/features/brandSlice';

const TableBrand = ({ setShow, setActions, setDataBrand, setBrandId }) => {
    const [limit, setLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const brandListAdminPagination = useSelector((state) => state.brand.brandListAdminPagination);
    useEffect(() => {
        dispatch(getAllBrandPaginationAdmin({ page: currentPage, limit: limit }));
    }, []);

    const handleChange = (event, value) => {
        setCurrentPage(value);
        dispatch(getAllBrandPaginationAdmin({ page: currentPage, limit: limit }));
    };

    const handleDeleteBrand = (brandId) => {
        dispatch(deleteBrandApi({ brandId }));
    };

    const handleEdit = (data) => {
        setShow(true);
        setActions('Edit');
        setDataBrand(data.name);
        setBrandId(data.id);
    };
    return (
        <div className="card-brand shadow border-0 p-3 mt-4 mb-5 bg-white rounded-2">
            <h3>Thương hiệu sản phẩm</h3>
            <div className="table-brand">
                <table class="table table-striped table-hover">
                    <thead className="table-info">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">TÊN THƯƠNG HIỆU</th>
                            <th scope="col">TƯƠNG TÁC</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brandListAdminPagination && brandListAdminPagination?.brands?.map((brand) => {
                            return (
                                <tr>
                                    <td className="id-brand">#{brand.id}</td>
                                    <td>{brand.name}</td>

                                    <td>
                                        <div className="actions">
                                            {/* <Tooltip title="Xem sản phẩm">
                                                    <Button className="view" color="secondary">
                                                        <VisibilityIcon />
                                                    </Button>
                                                </Tooltip> */}
                                            <Tooltip title="chỉnh sửa sẩn phẩm">
                                                <Button
                                                    className="edit"
                                                    color="warning"
                                                    onClick={() => handleEdit(brand)}
                                                >
                                                    <CreateIcon />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="xóa sản phẩm">
                                                <Button
                                                    className="delete"
                                                    color="error"
                                                    onClick={() => handleDeleteBrand(brand.id)}
                                                >
                                                    <DeleteIcon />
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="table-footer">
                    <div>
                        Trang
                        <strong> {currentPage} </strong>
                        <span className="divide">/ </span>
                        {brandListAdminPagination?.totalPages}
                    </div>
                    <Pagination
                        onChange={handleChange}
                        page={currentPage}
                        count={brandListAdminPagination?.totalPages}
                        variant="outlined"
                        shape="rounded"
                    />
                </div>
            </div>
        </div>
    );
};

export default TableBrand;
