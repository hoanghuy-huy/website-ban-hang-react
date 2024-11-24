import React from 'react';
import './Voucher.scss';
import { convertDate } from '~/utils/convert';

const Voucher = ({ discount, condition, expiryDate, onApply, disabled, freeShipping }) => {
    return (
        <div className={`voucher ${disabled ? 'disabled' : ''} ${freeShipping ? 'free-shipping' : ''}`}>
            {freeShipping && <div className="voucher-free-shipping">Miễn phí vận chuyển</div>}
            <div className="voucher-content">
                <div className="voucher-content-header">
                    <div className="voucher-discount">{discount}</div>
                    <div className="voucher-condition">{condition}</div>
                </div>
                <div className="voucher-expiry">HSD: {convertDate(expiryDate)}</div>
            </div>

            {disabled ? (
                <button className="voucher-button" disabled>
                    Không áp dụng
                </button>
            ) : (
                <button className="voucher-button" onClick={onApply}>
                    Áp dụng
                </button>
            )}
        </div>
    );
};

export default Voucher;
