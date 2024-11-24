import React from 'react';
import './VoucherMini.scss';
import { useDispatch } from 'react-redux';
import { handleSelectedVoucher } from '~/redux/features/voucherSlice';

const VoucherMini = ({ appliedVoucher, setAppliedVoucher }) => {
    const dispatch = useDispatch();

    return (
        <div className={appliedVoucher.disabled ? `voucher-mini disabled` : 'voucher-mini'}>
            <div className="voucher-mini-content">
                <div className="voucher-mini-info">
                    <span className="voucher-mini-discount">{appliedVoucher.discount}</span>
                </div>
                <button className="voucher-mini-button" onClick={() => dispatch(handleSelectedVoucher(null))}>
                    Bỏ Chọn
                </button>
            </div>
        </div>
    );
};

export default VoucherMini;
