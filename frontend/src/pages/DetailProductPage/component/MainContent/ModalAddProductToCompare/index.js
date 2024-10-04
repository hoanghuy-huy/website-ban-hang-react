import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import CheckIcon from '@mui/icons-material/Check';


import './ModalAddProductToCompare.scss';
import Image from '~/components/Image';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProductPagination, handleAddItemCompare, handleShowModalAddProductToCompare } from '~/redux/features/detailProductSlice';
import { convertPrice } from '~/utils/convert';
const ModalAddProductToCompare = () => {
    const dispatch = useDispatch();
    const { showModalAddProductToCompare, listProductPaginationWithCategory, listProductToCompare } = useSelector((state) => state.detailProduct);
    const renderResultSearchItem = () => {
        return listProductPaginationWithCategory?.products?.map((item) => {
            return (
                <li className="item d-flex justify-content-between align-items-center" style={{ width: '100%' }} onClick={() => dispatch(handleAddItemCompare(item))}>
                    <div className="info d-flex gap-4">
                        <div className="thumbnail-img my-1" style={{ paddingLeft: 3 }}>
                            <Image
                                style={{ width: 45, height: 45 }}
                                src={item?.thumbnailUrl}
                            />
                        </div>
                        <div className="info-text">
                            <h3 className="name">{item?.name}</h3>
                            <strong className="price">{convertPrice(item?.price)}</strong>
                        </div>
                    </div>
                    <div className="add-action me-2">
                        
                        {listProductToCompare.some((product) => product.id === item.id) ? <CheckIcon /> : <FontAwesomeIcon icon={faPlus} />}
                    </div>
                </li>
            );
        });
    };

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
                            <input placeholder="Tên sản phẩm" />
                        </div>
                    </div>
                    <ul className="search-item-modal-comparison">{renderResultSearchItem()}</ul>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ModalAddProductToCompare;
