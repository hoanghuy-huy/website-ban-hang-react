import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './ModalAddProductToCompare.scss';
import Image from '~/components/Image';
import { useDispatch, useSelector } from 'react-redux';
import { handleShowModalAddProductToCompare } from '~/redux/features/detailProductSlice';
const ModalAddProductToCompare = () => {
    const { showModalAddProductToCompare } = useSelector((state) => state.detailProduct);
    const dispatch = useDispatch()
    return (
        <Modal show={showModalAddProductToCompare} onHide={() => dispatch(handleShowModalAddProductToCompare())}> 
            <Modal.Header closeButton>
                <Modal.Title>Tìm sản phẩm bạn muốn so sánh</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ height: 450, overflow: 'hidden', overflowY: 'auto' }}>
                <div className="modal-add-item-to-compare">
                    <div className="input-search mb-3">
                        <label>Nhập tên sản phẩm </label>
                        <div className="modal__find-product-input">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="icon-search" />
                            <input />
                        </div>
                    </div>
                    <ul className="search-item-modal-comparison">
                        <li
                            className="item d-flex justify-content-between align-items-center"
                            style={{ width: '100%' }}
                        >
                            <div className="info d-flex gap-4">
                                <div className="thumbnail-img my-1" style={{ paddingLeft: 3 }}>
                                    <Image
                                        style={{ width: 45, height: 45 }}
                                        src="https://salt.tikicdn.com/cache/750x750/ts/product/50/2e/ec/012b2d477cabeaeff578b07f14dd33ea.jpg"
                                    />
                                </div>
                                <div className="info-text">
                                    <h3 className="name">Name product</h3>
                                    <strong className="price">1000000</strong>
                                </div>
                            </div>
                            <div className="add-action me-2">
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                        </li>
                    </ul>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ModalAddProductToCompare;
