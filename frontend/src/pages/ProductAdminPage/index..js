import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import TableProduct from '../TableProduct';
import './ProductAdminPage.scss';
import { Button, Tooltip } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ModalCreateProduct from './ModalCreateProduct';
import UploadImageBox from './UploadImageBox';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import images from '~/assets/images';
import { convertFileToBase64, convertPrice } from '~/utils/convert';
import DashBoardBox from '../DashBoardPage/DashBoardBox';
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryApi, editCategoryApi, fetchAllCategories } from '~/redux/features/categorySlice/categorySlice';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import InventoryIcon from '@mui/icons-material/Inventory';
import {
    createBrandApi,
    editBrandApi,
    getAllBrandAdmin,
    getAllBrandPaginationAdmin,
} from '~/redux/features/brandSlice';
import _, { includes } from 'lodash';
import { toast } from 'react-toastify';
import CancelIcon from '@mui/icons-material/Cancel';
import Image from '~/components/Image';
import {
    countProductApi,
    createProductApi,
    deleteProduct,
    editProductApi,
    fetchAllProductPagination,
} from '~/redux/features/productSlice/productSlice';
import TableCategory from '../TableCategory';
import TableBrand from '../TableBrand';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { totalProductsSold, totalRevenueApi } from '~/redux/features/orderSlice';
import TableRevenueProduct from '../TableRevenueProduct';
const ProductAdminPage = () => {
    const [showFromCreateProduct, setShowFromCreateProduct] = useState(false);
    const [actions, setActions] = useState('Add');
    const [actionBrand, setActionBrand] = useState('Add');
    const [actionCat, setActionCat] = useState('Add');
    const countProduct = useSelector((state) => state.products.countProduct);
    const totalProductSold = useSelector((state) => state.order.totalProductSold);
    const totalRevenue = useSelector((state) => state.order.totalRevenue);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllCategories());
        dispatch(getAllBrandAdmin());
        dispatch(countProductApi());
        dispatch(totalProductsSold());
        dispatch(totalRevenueApi());
    }, []);

    const defaultDataProduct = {
        id: '',
        name: '',
        description: '',
        price: '',
        discountRate: '',
        stock: '',
        cat: '',
        brand: '',
        auth: '',
        image: '',
    };

    const defaultValidInputs = {
        name: true,
        description: true,
        price: true,
        discountRate: true,
        stock: true,
        cat: true,
        brand: true,
        auth: true,
        image: true,
    };

    const defaultDataCat = {
        name: '',
        path: '',
        urlImg: '',
    };

    const defaultValidDataCat = {
        name: true,
        path: true,
        urlImg: true,
    };

    const catList = useSelector((state) => state.categories.categoryList);
    const brandList = useSelector((state) => state.brand.brandListAdmin);

    const [dataProduct, setDataProduct] = useState(defaultDataProduct);
    const [validDataProduct, setValidDataProduct] = useState(defaultValidInputs);
    const [dataCat, setDataCat] = useState(defaultDataCat);
    const [validDataCat, setValidDataCat] = useState(defaultValidDataCat);
    const [dataBrand, setDataBrand] = useState('');
    const [brandId, setBrandId] = useState('');

    // const handleOnChangeUploadFile = async (data) => {
    //     let file = data[0];

    //     setValidDataProduct(defaultValidInputs);
    //     if (file) {
    //         let base64 = await convertFileToBase64(file);
    //         let _data = _.cloneDeep(dataProduct);
    //         _data['image'] = base64;
    //         setDataProduct(_data);
    //     }
    // };

    const handleRemoveImage = () => {
        let _data = _.cloneDeep(dataProduct);
        _data['image'] = '';
        setDataProduct(_data);
    };
    const handleValidInputs = () => {
        setValidDataProduct(defaultValidInputs);

        let arr = ['name', 'price', 'stock', 'cat', 'brand', 'auth', 'image'];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            let _data = _.cloneDeep(dataProduct);

            if (_data[arr[i]] === '') {
                let _valid = _.cloneDeep(defaultValidInputs);
                _valid[arr[i]] = false;
                setValidDataProduct(_valid);
                check = false;
                return;
            }
        }
        // if (!dataProduct.image) {
        //     let _valid = _.cloneDeep(defaultValidInputs);
        //     _valid['image'] = false;
        //     setValidDataProduct(_valid);
        //     check = false;

        //     return;
        // }
        return check;
    };

    function validNumber(key, value) {
        const maxPrice = key === 'discountRate' ? 100 : 100000000;

        if (typeof value !== 'number' || isNaN(value)) {
            return false;
        }

        if (value < 0) {
            return false;
        }

        if (value > maxPrice) {
            return false;
        }

        return true;
    }

    const handleCreateProduct = (key, value) => {
        setValidDataProduct(defaultValidInputs);

        if (key === 'price' || key === 'stock' || key === 'discountRate') {
            if (!validNumber(key, +value) || value.includes('.') || value.includes(' ')) {
                return;
            }
        }

        let _dataProduct = _.cloneDeep(dataProduct);

        _dataProduct[key] = value;
        setDataProduct(_dataProduct);
    };

    const handleOnSubmit = async () => {
        let valid = handleValidInputs();
        if (valid) {
            let buildDataProduct = {
                name: dataProduct.name,
                categoryId: dataProduct.cat,
                brandId: dataProduct.brand,
                description: dataProduct.description,
                authentic: dataProduct.auth,
                price: +dataProduct.price,
                discountRate: +dataProduct.discountRate,
                thumbnailUrl: dataProduct.image,
                inventoryNumber: +dataProduct.stock,
            };

            await dispatch(createProductApi(buildDataProduct));
            await dispatch(fetchAllProductPagination({ page: 1, limit: 10 }));
            setDataProduct(defaultDataProduct);
        }
    };

    const handleDeleteProduct = async (productId) => {
        await dispatch(deleteProduct({ productId }));
        await dispatch(fetchAllProductPagination({ page: 1, limit: 10 }));
    };

    const handleOnChangeInputsCat = (key, value) => {
        setValidDataCat(defaultValidDataCat);
        let _data = _.cloneDeep(dataCat);
        _data[key] = value;
        setDataCat(_data);
    };

    const validInputCat = (value) => {
        setValidDataCat(defaultValidDataCat);
        let check = true;
        let arr = ['name', 'path', 'urlImg'];

        for (let i = 0; i < arr.length; i++) {
            let _data = _.cloneDeep(dataCat);
            if (_data[arr[i]] === '') {
                let _valid = _.cloneDeep(validDataCat);
                _valid[arr[i]] = false;
                setValidDataCat(_valid);
                check = false;
                return;
            }
        }

        return check;
    };
    const handleSubmitFormCat = async () => {
        let valid = validInputCat();
        if (valid) {
            await dispatch(createCategoryApi(dataCat));
            await dispatch(fetchAllCategories());
            setDataCat(defaultDataCat);
        }
    };

    const handleSubmitFormBrand = async () => {
        if (dataBrand === '') {
            toast.error('Vui lòng nhập tên thương hiệu');
        } else {
            if (actionBrand === 'Add') {
                await dispatch(createBrandApi({ name: dataBrand }));
                await dispatch(getAllBrandAdmin());
                await dispatch(getAllBrandPaginationAdmin({ limit: 10, page: 1 }));
                setDataBrand('');
            } else {
                await dispatch(editBrandApi({ id: brandId, name: dataBrand }));
                await dispatch(getAllBrandAdmin());
                await dispatch(getAllBrandPaginationAdmin({ limit: 10, page: 1 }));
                setActionBrand('Add');
                setDataBrand('');
            }
        }
    };

    const toggleFormCreateProduct = () => {
        setActions('Add');
        setActionCat('Add');
        setActionBrand('Add');
        setDataBrand('');
        setDataCat(defaultDataCat);
        setBrandId('');
        setShowFromCreateProduct(!showFromCreateProduct);
        setDataProduct(defaultDataProduct);
    };

    const handleSubmitFormEditProduct = async () => {
        let valid = handleValidInputs();
        if (valid) {
            let buildDataProduct = {
                id: dataProduct.id,
                name: dataProduct.name,
                categoryId: dataProduct.cat,
                brandId: dataProduct.brand,
                description: dataProduct.description,
                authentic: dataProduct.auth,
                price: +dataProduct.price,
                discountRate: +dataProduct.discountRate,
                thumbnailUrl: dataProduct.image,
                inventoryNumber: +dataProduct.stock,
            };

            await dispatch(editProductApi(buildDataProduct));
            setDataProduct(defaultDataProduct);
            setActions('Add');
        }
    };

    const handleSubmitEditFormCat = async () => {
        let valid = validInputCat();
        if (valid) {
            await dispatch(editCategoryApi(dataCat));
            await dispatch(fetchAllCategories());
            setDataCat(defaultDataCat);
            setActionCat('Add');
        }
    };

    return (
        <div className="product-admin-page">
            <div className="product-admin-container">
                <div className="w-100 shadow title bg-white">
                    <h3>Trang sản phẩm</h3>
                </div>
                <div className="DashBoardPage w-100 mt-4 ">
                    <div className="row DashBoardWrapperRow">
                        <div className="col-md-12">
                            <div className="DashBoardPageWrapper d-flex">
                                <DashBoardBox
                                    icon={<InventoryIcon />}
                                    title="Tổng số lượng sản phẩm"
                                    total={countProduct ? countProduct : 0}
                                    color={['#1da256', '#48d483']}
                                />
                                <DashBoardBox
                                    icon={<MonetizationOnIcon />}
                                    title="Tổng danh thu"
                                    total={convertPrice(totalRevenue) + ' VND'}
                                    color={['#c012e2', '#eb64fe']}
                                />
                                <DashBoardBox
                                    icon={<ShoppingCartIcon />}
                                    title="Tổng sản phẩm đã bán"
                                    total={totalProductSold ? totalProductSold : 0}
                                    color={['#2c78e5', '#60aff5']}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="create-product bg-white" onClick={() => toggleFormCreateProduct()}>
                    <Tooltip title="Tạo sản phẩm mới">
                        <AddIcon />
                    </Tooltip>
                </div>

                {showFromCreateProduct && (
                    <form className="form">
                        <div className="row">
                            <div className="col-sm-7">
                                <div className="card p-4 mt-3">
                                    <h5>Thông tin sản phẩm</h5>

                                    <div className="form-group">
                                        <h6>Tên sản phẩm</h6>
                                        <input
                                            type="text"
                                            className={
                                                validDataProduct.name === true
                                                    ? 'form-control'
                                                    : 'form-control form-control is-invalid'
                                            }
                                            value={dataProduct.name}
                                            onChange={(e) => handleCreateProduct('name', e.target.value)}
                                        />
                                        {validDataProduct.name === false && (
                                            <span className="mt-2 d-block text-danger">
                                                Không được để trống trường này
                                            </span>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <h6>Mô tả sản phẩm</h6>
                                        <textarea
                                            rows={5}
                                            cols={5}
                                            value={dataProduct.description}
                                            className={
                                                validDataProduct.description === true
                                                    ? 'form-control'
                                                    : 'form-control is-invalid'
                                            }
                                            onChange={(e) => handleCreateProduct('description', e.target.value)}
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-6">
                                            <h6>Giá sản phẩm</h6>
                                            <input
                                                type="text"
                                                value={dataProduct.price}
                                                className={
                                                    validDataProduct.price === true
                                                        ? 'form-control'
                                                        : 'form-control is-invalid'
                                                }
                                                onChange={(e) => handleCreateProduct('price', e.target.value)}
                                            />
                                            {validDataProduct.price === false && (
                                                <span className="mt-2 d-block text-danger">
                                                    Không được để trống trường này
                                                </span>
                                            )}
                                        </div>
                                        <div className="form-group col-6">
                                            <h6>Tỉ lệ giảm giá</h6>
                                            <input
                                                type="number"
                                                value={dataProduct.discountRate}
                                                className={
                                                    validDataProduct.discountRate === true
                                                        ? 'form-control'
                                                        : 'form-control is-invalid'
                                                }
                                                onChange={(e) => handleCreateProduct('discountRate', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group col-6">
                                            <h6>Số lượng trong kho</h6>
                                            <input
                                                type="number"
                                                value={dataProduct.stock}
                                                className={
                                                    validDataProduct.stock === true
                                                        ? 'form-control'
                                                        : 'form-control is-invalid'
                                                }
                                                onChange={(e) => handleCreateProduct('stock', e.target.value)}
                                            />
                                            {validDataProduct.stock === false && (
                                                <span className="mt-2 d-block text-danger">
                                                    Không được để trống trường này
                                                </span>
                                            )}
                                        </div>

                                        <div className="col-6">
                                            <div className="form-group">
                                                <h6>Danh mục </h6>
                                                <Select
                                                    onChange={(e) => handleCreateProduct('cat', e.target.value)}
                                                    value={dataProduct.cat}
                                                    displayEmpty
                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                    className="w-100"
                                                    size="small"
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    {catList &&
                                                        catList.map((category) => (
                                                            <MenuItem value={category?.id}>{category?.name}</MenuItem>
                                                        ))}
                                                </Select>
                                                {validDataProduct.cat === false && (
                                                    <span className="mt-2 d-block text-danger">
                                                        Không được để trống trường này
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <div className="form-group">
                                                <h6>Thương hiệu</h6>
                                                <Select
                                                    value={dataProduct.brand}
                                                    onChange={(e) => handleCreateProduct('brand', e.target.value)}
                                                    displayEmpty
                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                    className="w-100"
                                                    size="small"
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    {brandList &&
                                                        brandList.map((brand) => {
                                                            return <MenuItem value={brand.id}>{brand.name}</MenuItem>;
                                                        })}
                                                </Select>
                                                {validDataProduct.brand === false && (
                                                    <span className="mt-2 d-block text-danger">
                                                        Không được để trống trường này
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <div className="form-group">
                                                <h6>Chính hãng</h6>
                                                <Select
                                                    value={dataProduct.auth}
                                                    onChange={(e) => handleCreateProduct('auth', e.target.value)}
                                                    displayEmpty
                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                    className="w-100"
                                                    size="small"
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    <MenuItem value={1}>Có</MenuItem>
                                                    <MenuItem value={0}>Không</MenuItem>
                                                </Select>
                                                {validDataProduct.auth === false && (
                                                    <span className="mt-2 d-block text-danger">
                                                        Không được để trống trường này
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="form-group col-6">
                                            <h6>Link ảnh sản phẩm</h6>
                                            <input
                                                type="text"
                                                value={dataProduct.image}
                                                onChange={(e) => handleCreateProduct('image', e.target.value)}
                                                className={
                                                    validDataProduct.image === true
                                                        ? 'form-control'
                                                        : 'form-control is-invalid'
                                                }
                                            />
                                            {validDataProduct.image === false && (
                                                <span className="mt-2 d-block text-danger">
                                                    Không được để trống trường này
                                                </span>
                                            )}
                                            {/* <Button
                                            component="label"
                                            variant="contained"
                                            tabIndex={-1}
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            Tải ảnh lên
                                            <input
                                                className="upload-file"
                                                type="file"
                                                accept="image/jpeg, image/png"
                                                onChange={(event) => handleOnChangeUploadFile(event.target.files)}
                                            />
                                        </Button>
                                        {!validDataProduct.image && (
                                            <>
                                                <span className="mt-2 d-block text-danger">Vui lòng chọn ảnh</span>
                                            </>
                                        )} */}
                                        </div>

                                        <div className="form-group col-6">
                                            {dataProduct.image && (
                                                <div className="image-container">
                                                    <div className="icon" onClick={() => handleRemoveImage()}>
                                                        <CancelIcon className="text-danger" />
                                                    </div>

                                                    <Image src={dataProduct.image} />
                                                </div>
                                            )}
                                        </div>

                                        <div className="form-group col-12 mt-4">
                                            {actions === 'Add' ? (
                                                <Button onClick={() => handleOnSubmit()} className="w-100">
                                                    Thêm sản phẩm
                                                </Button>
                                            ) : (
                                                <Button
                                                    onClick={() => handleSubmitFormEditProduct()}
                                                    className="w-100 edit-btn"
                                                >
                                                    Lưu thay đổi
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-5">
                                <div className="card p-4 mt-3">
                                    <h5>Thêm danh mục</h5>
                                    <div className="form-group">
                                        <h6>Tên danh mục</h6>
                                        <div className="d-flex gap-3">
                                            <input
                                                type="text"
                                                onChange={(e) => handleOnChangeInputsCat('name', e.target.value)}
                                                value={dataCat.name}
                                                className={
                                                    validDataCat.name === true
                                                        ? 'form-control'
                                                        : 'form-control is-invalid'
                                                }
                                            />
                                        </div>

                                        {validDataCat.name === false && (
                                            <span className="mt-2 d-block text-danger">
                                                Không được để trống trường này
                                            </span>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <h6>Đường dẫn</h6>
                                        <div className="d-flex gap-3">
                                            <input
                                                value={dataCat.path}
                                                type="text"
                                                onChange={(e) => handleOnChangeInputsCat('path', e.target.value)}
                                                className={
                                                    validDataCat.path === true
                                                        ? 'form-control'
                                                        : 'form-control is-invalid'
                                                }
                                            />
                                        </div>
                                        {validDataCat.path === false && (
                                            <span className="mt-2 d-block text-danger">
                                                Không được để trống trường này
                                            </span>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <h6>Link hình ảnh</h6>
                                        <div className="d-flex gap-3">
                                            <input
                                                type="text"
                                                value={dataCat.urlImg}
                                                onChange={(e) => handleOnChangeInputsCat('urlImg', e.target.value)}
                                                className={
                                                    validDataCat.urlImg === true
                                                        ? 'form-control'
                                                        : 'form-control is-invalid'
                                                }
                                            />
                                        </div>
                                        {validDataCat.urlImg === false && (
                                            <span className="mt-2 d-block text-danger">
                                                Không được để trống trường này
                                            </span>
                                        )}
                                    </div>
                                    <div className="form-group col-12 mt-4">
                                        {actionCat === 'Add' ? (
                                            <Button className="w-100" onClick={() => handleSubmitFormCat()}>
                                                Thêm danh mục
                                            </Button>
                                        ) : (
                                            <Button
                                                className="w-100 edit-btn"
                                                onClick={() => handleSubmitEditFormCat()}
                                            >
                                                Sửa danh mục
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                <div className="card p-4 mt-3">
                                    <h5>Thêm thương hiệu</h5>
                                    <div className="form-group">
                                        <h6>Tên thương hiệu</h6>
                                        <div className="d-flex gap-3">
                                            <input
                                                type="text"
                                                onChange={(e) => setDataBrand(e.target.value)}
                                                value={dataBrand}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group col-12 mt-4">
                                        {actionBrand === 'Add' ? (
                                            <Button onClick={() => handleSubmitFormBrand()} className="w-100">
                                                Thêm thương hiệu
                                            </Button>
                                        ) : (
                                            <Button onClick={() => handleSubmitFormBrand()} className="w-100 edit-btn">
                                                Sửa thương hiệu
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                )}

                <TableRevenueProduct />
                
                <TableProduct
                    cat={catList}
                    brand={brandList}
                    handleDeleteProduct={handleDeleteProduct}
                    setDataProduct={setDataProduct}
                    setActions={setActions}
                    setShowFromCreateProduct={setShowFromCreateProduct}
                    defaultDataProduct={defaultDataProduct}
                />

                <TableCategory
                    setShow={setShowFromCreateProduct}
                    catList={catList}
                    setActions={setActionCat}
                    defaultDataCat={defaultDataCat}
                    setDataCat={setDataCat}
                />
                <TableBrand
                    setShow={setShowFromCreateProduct}
                    setActions={setActionBrand}
                    setDataBrand={setDataBrand}
                    setBrandId={setBrandId}
                />
            </div>
        </div>
    );
};

export default ProductAdminPage;
