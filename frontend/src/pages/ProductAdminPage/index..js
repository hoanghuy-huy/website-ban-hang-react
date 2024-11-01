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
import { convertFileToBase64 } from '~/utils/convert';
import DashBoardBox from '../DashBoardPage/DashBoardBox';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategories } from '~/redux/features/categorySlice/categorySlice';
import { getAllBrandAdmin } from '~/redux/features/brandSlice';
import _, { includes } from 'lodash';
import { toast } from 'react-toastify';
import CancelIcon from '@mui/icons-material/Cancel';
const ProductAdminPage = () => {
    const [brandOption, setBrandOption] = useState('');
    const [catOption, setCatOption] = useState('');
    const [showFromCreateProduct, setShowFromCreateProduct] = useState(false)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllCategories());
        dispatch(getAllBrandAdmin());
    }, []);

    const defaultDataProduct = {
        name: '',
        description: '',
        price: '',
        discountRate: '',
        stock: '',
        cat: '',
        brand: '',
        auth: '',
        image: null,
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

    const catList = useSelector((state) => state.categories.categoryList);
    const brandList = useSelector((state) => state.brand.brandListAdmin);

    const [dataProduct, setDataProduct] = useState(defaultDataProduct);
    const [validDataProduct, setValidDataProduct] = useState(defaultValidInputs);

    const handleOnChangeUploadFile = async (data) => {
        let file = data[0];

        setValidDataProduct(defaultValidInputs);
        if (file) {
            let base64 = await convertFileToBase64(file);
            let _data = _.cloneDeep(dataProduct);
            _data['image'] = base64;
            setDataProduct(_data);
        }
    };

    const handleRemoveImage = () => {
        let _data = _.cloneDeep(dataProduct);
        _data['image'] = '';
        setDataProduct(_data);
    };
    const handleValidInputs = () => {
        setValidDataProduct(defaultValidInputs);

        let arr = ['name', 'price', 'stock', 'cat', 'brand', 'auth'];
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
        if (!dataProduct.image) {
            let _valid = _.cloneDeep(defaultValidInputs);
            _valid['image'] = false;
            setValidDataProduct(_valid);
            check = false;

            return;
        }
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

    const handleOnSubmit = () => {
        let valid = handleValidInputs();
        if (valid) {
            console.log(dataProduct);
        }
    };

    const handleOnChangeInputsOption = (key, value) => {
        if (key === 'cat') {
            setCatOption(value);
        }

        if (key === 'brand') {
            setBrandOption(value);
        }
    };

    const handleSubmitOption = (key) => {
        
        if (key === 'cat') {
            if(catOption === '') {
                toast.error('Vui lòng nhập danh mục')
            }
            setCatOption('')

        }   

        if (key === 'brand') {
            if(catOption === '') {
                toast.error('Vui lòng nhập thương hiệu')
            }
            setBrandOption('')
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
                                <DashBoardBox color={['#1da256', '#48d483']} />
                                <DashBoardBox color={['#c012e2', '#eb64fe']} />
                                <DashBoardBox color={['#2c78e5', '#60aff5']} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="create-product bg-white" onClick={() => setShowFromCreateProduct(!showFromCreateProduct)}>
                    <Tooltip title="Tạo sản phẩm mới">
                        <AddIcon />
                    </Tooltip>
                </div>

                {showFromCreateProduct && <form className="form">
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
                                        <span className="mt-2 d-block text-danger">Không được để trống trường này</span>
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
                                        <h6>Ảnh sản phẩm</h6>
                                        <Button
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
                                        )}
                                    </div>

                                    <div className="form-group col-6">
                                        {dataProduct.image && (
                                            <div className="image-container">
                                                <div className="icon" onClick={() => handleRemoveImage()}>
                                                    <CancelIcon className="text-danger" />
                                                </div>

                                                <img src={dataProduct.image} />
                                            </div>
                                        )}
                                    </div>

                                    <div className="form-group col-12 mt-4">
                                        <Button onClick={() => handleOnSubmit()} className="w-100">
                                            Thêm sản phẩm
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-5">
                            <div className="card p-4 mt-3">
                                <h5>Thêm lựa chọn</h5>
                                <div className="form-group">
                                    <h6>Tên doanh mục</h6>
                                    <div className="d-flex gap-3">
                                        <input
                                            type="text"
                                            onChange={(e) => handleOnChangeInputsOption('cat',e.target.value)}
                                            value={catOption}
                                        />
                                        <Button onClick={() => handleSubmitOption('cat')}>Thêm</Button>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <h6>Tên thương hiệu</h6>
                                    <div className="d-flex gap-3">
                                        <input
                                            type="text"
                                            onChange={(e) => handleOnChangeInputsOption('brand',e.target.value)}
                                            value={brandOption}
                                        />
                                        <Button onClick={() => handleSubmitOption('brand')}>Thêm</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>}


                <TableProduct cat={catList} brand={brandList}/>
            </div>
        </div>
    );
};

export default ProductAdminPage;
