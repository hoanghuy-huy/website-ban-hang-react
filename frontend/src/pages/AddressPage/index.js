import React from 'react';
import { Checkbox, Radio, RadioGroup, TextField } from '@mui/material';
import Button from '~/components/Button/Button';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _, { add } from 'lodash';

import './AddressPage.scss';
import { createNewAddressApi, deleteAddressApi, editAddressApi, getAllAddressWithUserId, handleChangeAddressDeliveryRedux } from '~/redux/features/addressSlice';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddressPage = () => {
    const [city, setCity] = useState([]);
    const [district, setDistrict] = useState([]);
    const [ward, setWard] = useState([]);
    const [selectedCity, setSelectedCity] = useState(0);
    const [selectedDistrict, setSelectedDistrict] = useState(0);
    const { showModalAddress } = useSelector((state) => state.cart);
    const { userId } = useSelector((state) => state.account.account);
    const { listAddress } = useSelector((state) => state.address);
    const [showCheckbox, setShowCheckbox] = useState(true);
    const [showFromInputAddress, setShowFromInputAddress] = useState(false)


    const dispatch = useDispatch();

    const defaultValueAddress = {
        id: '',
        userId: userId,
        recipientName: '',
        phone: '',
        city: '',
        district: '',
        ward: '',
        address: '',
        typeAddress: '',
        defaultAddress: false,
    };

    const defaultValidAddress = {
        recipientName: true,
        phone: true,
        city: true,
        district: true,
        ward: true,
        address: true,
        typeAddress: true,
        defaultAddress: true,
    };

    const [validInfoAddress, setValidInfoAddress] = useState(defaultValidAddress);
    const [infoAddress, setInfoAddress] = useState(defaultValueAddress);

    const fetchDataCity = async () => {
        const res = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm');

        if (res && res.data && res.data.error === 0) {
            setCity(res.data.data);
        }
    };

    const fetchDataDistrict = async () => {
        const res = await axios.get(`https://esgoo.net/api-tinhthanh/2/${selectedCity}.htm`);

        if (res && res.data && res.data.error === 0) {
            setDistrict(res.data.data);
            setWard([]);
            setSelectedDistrict(0);
        }
    };

    const fetchDataWard = async () => {
        const res = await axios.get(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`);

        if (res && res.data && res.data.error === 0) {
            setWard(res.data.data);
        }
    };

    useEffect(() => {
        if (selectedCity) {
            fetchDataDistrict();
        }
    }, [selectedCity]);

    useEffect(() => {
        if (selectedDistrict) {
            fetchDataWard();
        }
    }, [selectedDistrict]);

    useEffect(() => {
        dispatch(getAllAddressWithUserId(userId));

        fetchDataCity();
    }, []);

    const handleOnChangeInput = (key, value) => {
        const _infoAddress = _.cloneDeep(infoAddress);
        if (key === 'city') {
            setSelectedCity(value);
            const _city = city.find((location) => location.id === value);
            _infoAddress['city'] = _city?.full_name;
        } else if (key === 'district') {
            setSelectedDistrict(value);
            const _district = district.find((location) => location.id === value);
            _infoAddress['district'] = _district?.full_name;
        } else if (key === 'ward') {
            const _ward = ward.find((location) => location.id === value);
            _infoAddress['ward'] = _ward?.full_name;
        } else {
            _infoAddress[key] = value;
        }
        setInfoAddress(_infoAddress);
    };

    const handleValidInputAddress = () => {
        setValidInfoAddress(defaultValidAddress);
        let check = true;
        let arr = ['recipientName', 'phone', 'city', 'district', 'ward', 'address'];
        let name = ['họ tên', 'số điện thoại', 'tỉnh thành', 'quận huyện', 'phường xã', 'địa chỉ'];

        let i = 0;
        for (i = 0; i < arr.length; i++) {
            if (!infoAddress[arr[i]]) {
                let _validInputs = _.cloneDeep(defaultValidAddress);
                _validInputs[arr[i]] = false;
                setValidInfoAddress(_validInputs);

                toast.error(`Không thể để trống ${name[i].toLocaleLowerCase()}`);
                check = false;
                break;
            }
        }
        return check;
    };

    const handleEditAddress = (address) => {
        setShowFromInputAddress(true)
        const _infoAddress = _.cloneDeep(infoAddress);

        _infoAddress.recipientName = address.recipientName;
        _infoAddress.address = address.address;
        _infoAddress.phone = address.phone;
        _infoAddress.id = address.id;
        _infoAddress.defaultAddress = address.defaultAddress;
        if (address.defaultAddress) {
            setShowCheckbox(false);
        } else setShowCheckbox(true);

        setInfoAddress(_infoAddress);
    };

    const handleSaveAddress = () => {
        let valid = handleValidInputAddress();
        if (valid) {
            if (!infoAddress?.id) {
                dispatch(createNewAddressApi(infoAddress));
            } else {
                dispatch(editAddressApi(infoAddress));

            }
            dispatch(getAllAddressWithUserId(userId));
            window.location.reload()
        }

    };

    const handleDeleteAddress = (address) => {
        dispatch(deleteAddressApi(address))

        dispatch(getAllAddressWithUserId(userId))
    }

    const handleShowFormInputAddress = () => {
        setInfoAddress(defaultValueAddress)

        setShowFromInputAddress(true)
    }

    const handleChangeDeliveryAddress = (address,href) => {
        dispatch(handleChangeAddressDeliveryRedux(address))
    }

    return (
        <main className="AddressPage ">
            <div className="AddressPage-container">
                <h5 className="address-list-text">Chọn địa chỉ giao hàng có sẵn bên dưới:</h5>
                <div className="address-list">
                    {listAddress && listAddress?.length > 0 ? (
                        <>
                            {listAddress.map((item) => {
                                return (
                                    <div
                                        className={
                                            item?.defaultAddress === true
                                                ? 'address-list-container-active'
                                                : 'address-list-container'
                                        }
                                    >
                                        <p className="name">{item?.recipientName}</p>
                                        <p className="address">
                                            Địa chỉ: {item?.address}, {item?.ward}, {item?.district}, {item?.city}, Việt
                                            Nam
                                        </p>
                                        <p className="phone">Điện thoại: {item?.phone}</p>
                                        <p className="action">
                                            <button type="button" className="btn saving-address" onClick={() => handleChangeDeliveryAddress(item)}>
                                                Giao đến địa chỉ này
                                            </button>
                                            <button
                                                type="button"
                                                className="btn edit-address"
                                                onClick={() => handleEditAddress(item)}
                                            >
                                                {' '}
                                                Sửa
                                            </button>
                                            {item?.defaultAddress !== true && (
                                                <button type="button" className="btn edit-address" onClick={() => handleDeleteAddress(item)}>
                                                    {' '}
                                                    Xóa
                                                </button>
                                            )}
                                        </p>
                                        {item?.defaultAddress === true && <span className="default">Mặc định</span>}
                                    </div>
                                );
                            })}


                        </>
                    ) : (
                        <div className="ps-4 pb-3"> Chưa có địa chỉ giao hàng</div>
                    )}
                </div>

                <p className="address-new-address">
                    Bạn muốn giao hàng đến địa chỉ khác? <span onClick={() => handleShowFormInputAddress()}>Thêm địa chỉ giao hàng mới</span>
                </p>
                {
                    showFromInputAddress &&
                <div className="form-address">
                    <div className="form-container">
                        <div className="input-container col-12">
                            <label className="col-3">Họ và tên</label>
                            <input
                                className={validInfoAddress.recipientName ? 'form-control' : 'form-control is-invalid'}
                                id="recipientName"
                                value={infoAddress?.recipientName}
                                onChange={(e) => handleOnChangeInput('recipientName', e.target.value)}
                                placeholder="Nhập họ tên"
                            />
                        </div>
                        <div className="input-container col-12">
                            <label className="col-3">Số điện thoại</label>
                            <input
                                className={validInfoAddress?.phone ? 'form-control' : 'form-control is-invalid'}
                                id="phoneNumber"
                                value={infoAddress?.phone}
                                onChange={(e) => handleOnChangeInput('phone', e.target.value)}
                                placeholder="Nhập số điện thoại"
                            />
                        </div>
                        <div className="input-container col-12">
                            <label className="col-3">Tỉnh/Thành phố</label>
                            <select
                                className="form-select"
                                value={selectedCity}
                                onChange={(e) => handleOnChangeInput('city', e.target.value)}
                                class={validInfoAddress.city ? 'form-control' : 'form-control is-invalid'}
                            >
                                <option selected>Chọn Tỉnh/ Thành phố</option>
                                {city.map((city) => (
                                    <option key={city?.id} value={city?.id}>
                                        {city?.full_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="input-container col-12">
                            <label className="col-3">Quận/Huyện</label>
                            <select
                                className="form-select"
                                onChange={(e) => handleOnChangeInput('district', e.target.value)}
                                value={selectedDistrict}
                                class={validInfoAddress.district ? 'form-control' : 'form-control is-invalid'}
                            >
                                <option selected>Chọn Quận/Huyện</option>
                                {district?.map((item) => (
                                    <option key={item?.id} value={item.id}>
                                        {item?.full_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="input-container col-12">
                            <label className="col-3">Phường/Xã</label>
                            <select
                                className="form-select"
                                onChange={(e) => handleOnChangeInput('ward', e.target.value)}
                                class={validInfoAddress?.ward ? 'form-control' : 'form-control is-invalid'}
                            >
                                <option selected>chọn Phường/Xã</option>
                                {ward.map((item) => (
                                    <option key={item?.id} value={item.id}>
                                        {item?.full_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="input-container col-12">
                            <label className="col-3">Địa chỉ</label>
                            <textarea
                                className={validInfoAddress?.address ? 'form-control' : 'form-control is-invalid'}
                                value={infoAddress?.address}
                                onChange={(e) => handleOnChangeInput('address', e.target.value)}
                                placeholder="Ví dụ: 52, đường Trần Hưng Đạo"
                                rows="3"
                            />
                        </div>
                        <div className="input-container col-12">
                            <label className="col-3">Loại địa chỉ</label>
                            <RadioGroup className="d-flex flex-row" defaultValue={'home'}>
                                <div className="input-radio">
                                    <Radio
                                        variant="solid"
                                        name="type-address"
                                        value="home"
                                        onChange={(e) => handleOnChangeInput('typeAddress', e.target.value)}
                                    />
                                    Nhà riêng / Chung cư
                                </div>
                                <div className="input-radio">
                                    <Radio
                                        name="type-address"
                                        value="company"
                                        onChange={(e) => handleOnChangeInput('typeAddress', e.target.value)}
                                        variant="solid"
                                    />
                                    Cơ quan / Công ty
                                </div>
                            </RadioGroup>
                        </div>
                        {showCheckbox && (
                            <div className="input-container col-12">
                                <label className="col-3"></label>
                                <span>
                                    <Checkbox
                                        onChange={(e) => handleOnChangeInput('defaultAddress', e.target.checked)}
                                    />
                                    Sử dụng địa chỉ này làm mặc định.
                                </span>
                            </div>
                        )}
                        <div className="input-container col-12">
                            <label className="col-3"></label>
                            <div className="button-group">
                                <div className="btn-cancel">
                                    <Button onClick={() => setShowFromInputAddress(false)}>Hủy bỏ</Button>
                                </div>
                                <div className="btn-update" onClick={() => handleSaveAddress()}>
                                    <Button normal>Lưu địa chỉ</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
        </main>
    );
};

export default AddressPage;
