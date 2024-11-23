import React from 'react';
import './VoucherMini.scss';

const VoucherMini = ({ appliedVoucher, setAppliedVoucher }) => {
    return (
        <div className={`voucher-mini`}>
            <div className="voucher-mini-content">
                <div className="voucher-mini-info">
                    <span className="voucher-mini-discount">{appliedVoucher.discount}</span>
                </div>
                <button className="voucher-mini-button" onClick={() => setAppliedVoucher(null)}>
                    Bỏ Chọn
                </button>
            </div>
        </div>
    );
};

export default VoucherMini;
