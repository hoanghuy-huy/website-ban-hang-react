import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';
const ModalCreateProduct = (props) => {
    return (
        <Modal show={true} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container-body row">
                    <div className="input grid-3 col-12 col-sm-6 form-group">
                        <label>
                            Tên sản phẩm (<span className="red"> * </span>) :
                        </label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="input grid-3 col-12 col-sm-6 form-group">
                        <label>
                            Giá (<span className="red"> * </span>) :
                        </label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="input grid-3 col-12 col-sm-6 form-group">
                        <label>Mô tả sản phẩm :</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="input grid-3 col-12 col-sm-6 form-group">
                        <label>
                            Số lượng trong kho (<span className="red"> * </span>) :
                        </label>
                        <input type="text" className="form-control" />
                    </div>


                    <div className="grid-3 col-12 col-sm-6 form-group">
                        <label>
                            Chính hảng (<span className="red"> * </span>) :{' '}
                        </label>
                        <select className={'form-select'}>
                            <option>1</option>
                            <option>1</option>
                            <option>1</option>
                        </select>
                    </div>
                    <div className="grid-3 col-12 col-sm-6 form-group">
                        <label>
                            Thương hiệu (<span className="red"> * </span>) :{' '}
                        </label>
                        <select className={'form-select'}>
                            <option>1</option>
                            <option>1</option>
                            <option>1</option>
                        </select>
                    </div>

                    <div className="input grid-3 col-12 col-sm-6 form-group">
                        <label>
                            Link ảnh sản phẩm (<span className="red"> * </span>) :
                        </label>
                        <input type="text" className="form-control" />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary">Close</Button>

                <Button variant="warning">Save Changes</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalCreateProduct;
