import React from 'react';
import './ModalVouCher.scss';
import { Modal } from 'react-bootstrap';
import Voucher from './Voucher';
import { useDispatch } from 'react-redux';
import { handleSelectedVoucher } from '~/redux/features/voucherSlice';

const ModalVouCher = ({ show, setShow, totalPrice, voucherList, setAppliedVoucher }) => {
    const dispatch = useDispatch()

    const handleApply = (voucher) => {
        // setAppliedVoucher(voucher);
        dispatch(handleSelectedVoucher(voucher))
        setShow(false);
    };

    return (
        <div className="modal-voucher">
            <Modal show={show} animation={false}>
                <Modal.Header closeButton onClick={() => setShow(false)}>
                    <Modal.Title>
                        <div className="title-modal-voucher">Voucher Khuyến Mãi</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="group-header-modal-voucher">
                        <div className="d-flex justify-content-between">
                            <div className="group-header__title">Mã Giảm Giá</div>
                            <div className="group-header__condition">Áp dụng tối đa: 1</div>
                        </div>
                        <div className="coupon-list">
                            {voucherList.map((voucher, index) => (
                                <Voucher
                                    key={index} 
                                    discount={voucher.discount}
                                    condition={voucher.condition}
                                    expiryDate={voucher.expiryDate}
                                    onApply={() => handleApply(voucher)}
                                    disabled={voucher.disabled}
                                    freeShipping={voucher.freeShipping}
                                />
                            ))}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ModalVouCher;