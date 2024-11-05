import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton, Tooltip } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import Pagination from '@mui/material/Pagination';
import './TableProduct.scss';
import { useDispatch } from 'react-redux';
import { deleteCategoryApi } from '~/redux/features/categorySlice/categorySlice';

const TableCategory = ({ catList, setDataCat, setShow, setActions }) => {
    const [limit, setLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();

    const handleDeleteCat = (categoryId) => {
        dispatch(deleteCategoryApi({ categoryId }));
    };
    const handleEditCat = (data) => {
        setActions('Edit');
        setShow(true);
        setDataCat({ id: data.id, name: data.name, path: data.path, urlImg: data.urlImg });
    };
    return (
        <div className="card-cat shadow border-0 p-3 mt-4 mb-5 bg-white rounded-2">
            <h3>Danh mục sản phẩm</h3>
            <div className="table-cat">
                <table class="table table-striped table-hover">
                    <thead className="table-success">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">TÊN</th>
                            <th scope="col">ĐƯỜNG DẪN</th>
                            <th scope="col">LINK HÌNH ẢNH</th>
                            <th scope="col">TƯƠNG TÁC</th>
                        </tr>
                    </thead>
                    <tbody>
                        {catList &&
                            catList.map((cat) => {
                                return (
                                    <tr>
                                        <td>#{cat.id}</td>
                                        <td>{cat.name}</td>
                                        <td>{cat.path}</td>
                                        <td>
                                            <div>
                                                <div className="info">
                                                    <h6>{cat.urlImg}</h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="actions">
                                                <Tooltip title="chỉnh sửa sẩn phẩm">
                                                    <Button
                                                        className="edit"
                                                        color="warning"
                                                        onClick={() => handleEditCat(cat)}
                                                    >
                                                        <CreateIcon />
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip title="xóa sản phẩm">
                                                    <Button
                                                        className="delete"
                                                        color="error"
                                                        onClick={() => handleDeleteCat(cat.id)}
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
            </div>
        </div>
    );
};

export default TableCategory;
