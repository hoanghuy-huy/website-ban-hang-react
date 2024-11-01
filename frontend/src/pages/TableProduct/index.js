import React, { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton, Tooltip } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import Image from '~/components/Image';
import StarIcon from '@mui/icons-material/Star';
import Pagination from '@mui/material/Pagination';
import './TableProduct.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProductPagination } from '~/redux/features/productSlice/productSlice';
import { convertPrice } from '~/utils/convert';
import { fetchAllCategories } from '~/redux/features/categorySlice/categorySlice';

const TableProduct = ({ cat, brand }) => {
    const [age, setAge] = React.useState('');
    const [limit, setLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const listProductPagination = useSelector((state) => state.products.listProductPagination);

    useEffect(() => {
        dispatch(fetchAllProductPagination({ page: currentPage, limit: limit }));
    }, []);

    console.log(cat);

    const handleChange = (event, value) => {
        setCurrentPage(value);
        dispatch(fetchAllProductPagination({ page: currentPage, limit: limit }));
    };

    const handleDeleteProduct = (id) => {};
    return (
        <div className="card-product shadow border-0 p-3 mt-4 mb-5 bg-white rounded-2">
            <h3>Sản phẩm</h3>
            <div className="row card-filter mt-3">
                <div className="col-md-4">
                    <h4>Danh mục</h4>
                    <FormControl sx={{ m: 1, minWidth: 120, width: '100%' }} size="small">
                        <Select
                            value={age}
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {cat &&
                                cat.map((cat) => {
                                    return <MenuItem value={cat.id}>{cat.name}</MenuItem>;
                                })}
                        </Select>
                    </FormControl>
                </div>

                <div className="col-md-4">
                    <h4>Thương hiệu</h4>
                    <FormControl size="small" sx={{ m: 1, minWidth: 120, width: '100%' }}>
                        <Select
                            value={age}
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {brand &&
                                brand.map((brand) => {
                                    return <MenuItem value={brand.id}>{brand.name}</MenuItem>;
                                })}
                        </Select>
                    </FormControl>
                </div>
            </div>

            <div className="table-product">
                <table class="table table-striped table-hover">
                    <thead className="table-primary">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">SẢN PHẨM</th>
                            <th scope="col">DANH MỤC</th>
                            <th scope="col">THƯƠNG HIỆU</th>
                            <th scope="col">GIÁ</th>
                            <th scope="col">KHO</th>
                            <th scope="col">ĐÁNH GIÁ</th>
                            <th scope="col">ĐÃ BÁN</th>
                            <th scope="col">TƯƠNG TÁC</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listProductPagination &&
                            listProductPagination.products.length > 0 &&
                            listProductPagination.products.map((product) => {
                                const category = cat && cat.find((item) => item.id === product.categoryId);

                                return (
                                    <tr>
                                        <td>#{product.id}</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className="img-wrapper me-2">
                                                    <div className="img">
                                                        <Image src={product.thumbnailUrl} />
                                                    </div>
                                                </div>
                                                <div className="info">
                                                    <h6>{product.name}</h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{category ? category.name : 'N/A'}</td>

                                        <td>{product.brandName ? product.brandName : 'N/A'}</td>
                                        <td>
                                            {product.originalPrice !== product.price && (
                                                <del className="price-old">{convertPrice(product.originalPrice)}</del>
                                            )}

                                            <span className="price-new text-danger">{convertPrice(product.price)}</span>
                                        </td>
                                        <td>{product.inventoryNumber ? product.inventoryNumber : 'N/A'}</td>
                                        <td>
                                            {product.starsNumber === null ? (
                                                'N/A '
                                            ) : (
                                                <>
                                                    <StarIcon sx={{ fontSize: 15 }} color="warning" />
                                                    <strong>{product.starsNumber}</strong> ({product.totalRating})
                                                </>
                                            )}
                                        </td>
                                        <td>{product.quantitySold ? product.quantitySold : '0'}</td>
                                        <td>
                                            <div className="actions">
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
                                                <Tooltip
                                                    title="xóa sản phẩm"
                                                    onClick={() => handleDeleteProduct(product.id)}
                                                >
                                                    <Button className="delete" color="error">
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
                        {listProductPagination?.totalPages}
                    </div>
                    <Pagination
                        onChange={handleChange}
                        page={currentPage}
                        count={listProductPagination?.totalPages}
                        variant="outlined"
                        shape="rounded"
                    />
                </div>
            </div>
        </div>
    );
};

export default TableProduct;
