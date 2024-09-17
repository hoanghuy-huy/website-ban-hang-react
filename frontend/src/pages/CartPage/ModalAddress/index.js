import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { handleHideModalAddress } from '~/redux/features/cartSlice';
function ModalAddress({ show, handleHide, handleSave, infoAddress, setInfoAddress, validInfoAddress }) {
    const [city, setCity] = useState([]);
    const [district, setDistrict] = useState([]);
    const [ward, setWard] = useState([]);
    const [selectedCity, setSelectedCity] = useState(0);
    const [selectedDistrict, setSelectedDistrict] = useState(0);
    const { showModalAddress } = useSelector((state) => state.cart);
    const dispatch = useDispatch()

    useEffect(() => {
        fetch('https://esgoo.net/api-tinhthanh/1/0.htm')
            .then((response) => response.json())
            .then((data) => {
                if (data.error === 0) {
                    setCity(data.data);
                }
            });
    }, []);

    useEffect(() => {
        if (selectedCity) {
            fetch(`https://esgoo.net/api-tinhthanh/2/${selectedCity}.htm`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.error === 0) {
                        setDistrict(data.data);
                        setWard([]);
                        setSelectedDistrict(0);
                    }
                });
        }
    }, [selectedCity]);

    useEffect(() => {
        if (selectedDistrict) {
            fetch(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.error === 0) {
                        setWard(data.data);
                    }
                });
        }
    }, [selectedDistrict]);

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
        console.log(key, value)
        setInfoAddress(_infoAddress);
    };
    return (
        <Modal size="lg" show={showModalAddress} onHide={handleHide}>
            <Modal.Header closeButton>
                <Modal.Title>Địa chỉ giao hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="ModalAddress-container">
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="recipientName" className="form-label">
                                Họ tên
                            </label>
                            <input
                                type="text"
                                className={validInfoAddress.recipientName ? 'form-control' : 'form-control is-invalid'}
                                id="recipientName"
                                value={infoAddress?.recipientName}
                                onChange={(e) => handleOnChangeInput('recipientName', e.target.value)}
                                placeholder="Nhập tên người nhận"
                            />
                        </div>
                        <div className="col-6">
                            <label className="form-label">Điện thoại di động</label>
                            <input
                                type="tel"
                                className={validInfoAddress?.phone ? 'form-control' : 'form-control is-invalid'}
                                id="phoneNumber"
                                value={infoAddress?.phone}
                                onChange={(e) => handleOnChangeInput('phone', e.target.value)}
                                placeholder="Nhập số điện thoại"
                            />
                        </div>
                        <div className="col-12 mt-2">
                            <label className="form-label">Tỉnh/Thành phố</label>
                            <Form.Select
                                value={selectedCity}
                                onChange={(e) => handleOnChangeInput('city', e.target.value)}
                                className={validInfoAddress.city ? 'form-control' : 'form-control is-invalid'}
                            >
                                <option value={0}>Tỉnh Thành</option>
                                {city.map((city) => (
                                    <option key={city?.id} value={city?.id}>
                                        {city?.full_name}
                                    </option>
                                ))}
                            </Form.Select>
                        </div>
                        <div className="col-12 mt-2">
                            <label className="form-label">Quận/Huyện</label>
                            <Form.Select
                                onChange={(e) => handleOnChangeInput('district', e.target.value)}
                                value={selectedDistrict}
                                className={validInfoAddress.district ? 'form-control' : 'form-control is-invalid'}
                            >
                                <option value={0}>Quận Huyện</option>
                                {district?.map((item) => (
                                    <option key={item?.id} value={item.id}>
                                        {item?.full_name}
                                    </option>
                                ))}
                            </Form.Select>
                        </div>
                        <div className="col-12 mt-2">
                            <label className="form-label">Phường/Xã</label>
                            <Form.Select
                                onChange={(e) => handleOnChangeInput('ward', e.target.value)}
                                className={validInfoAddress?.ward ? 'form-control' : 'form-control is-invalid'}
                            >
                                <option>Phường Xã</option>

                                {ward.map((item) => (
                                    <option key={item?.id} value={item.id}>
                                        {item?.full_name}
                                    </option>
                                ))}
                            </Form.Select>
                        </div>
                        <div className="col-12 mt-2">
                            <label className="form-label">Địa chỉ</label>
                            <textarea
                                className={validInfoAddress?.address ? 'form-control' : 'form-control is-invalid'}
                                value={infoAddress?.address}
                                onChange={(e) => handleOnChangeInput('address', e.target.value)}
                                placeholder="Ví dụ: 52, đường Trần Hưng Đạo"
                                rows="3"
                            />
                        </div>
                        <div className="col-12 mt-3 d-flex gap-3">
                            <label className="form-label">Loại địa chỉ</label>
                            <Form.Check
                                type="radio"
                                label={` Nhà riêng / Chung cư`}
                                name="type-address"
                                value="home"
                                onChange={(e) => handleOnChangeInput('typeAddress', e.target.value)}
                                defaultValue='home'
                                defaultChecked
                            />

                            <Form.Check // prettier-ignore
                                type="radio"
                                label={`Cơ quan / Công ty`}
                                name="type-address"
                                value="company"
                                onChange={(e) => handleOnChangeInput('typeAddress', e.target.value)}
                            />
                            <Form.Check // prettier-ignore
                                type="checkbox"
                                label={`Sử dụng địa chỉ này làm mặc định.`}
                                onChange={(e) => handleOnChangeInput('defaultAddress', e.target.checked)}
                            />
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleHide}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Lưu địa chỉ
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalAddress;
