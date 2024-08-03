import React, { useState } from 'react';
import Button from '~/components/Button/Button';
import './BoxBuy.scss';

const BoxBuy = ({ item }) => {
    const [quantity, setQuantity] = useState(1);
    const originalPrice = item?.price;
    const [price, setPrice] = useState(originalPrice);
    const handlePrice = (_quantity) => {
        if (_quantity < 1) {
            return;
        }
        setQuantity(_quantity);
        const timer = setTimeout(() => {
            setPrice(_quantity * originalPrice);
        }, 100);

        return () => {
            clearTimeout(timer);
        };
    };
    return (
        <div className="content-right col-3 gap-5">
            <div className="content-right__quantity-input mx-3">
                <p className="label mt-2">Số Lượng</p>
                <div className="group-input">
                    <button onClick={() => handlePrice(quantity - 1)} className={quantity === 1 ? 'disable' : ''}>
                        <img
                            src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-remove.svg"
                            alt="remove-icon"
                            width="20"
                            height="20"
                        />
                    </button>
                    <input type="text" value={quantity} class="input" tabIndex="-1" />
                    <button onClick={() => handlePrice(quantity + 1)}>
                        <img
                            src="https://frontend.tikicdn.com/_desktop-next/static/img/pdp_revamp_v2/icons-add.svg"
                            alt="add-icon"
                            width="20"
                            height="20"
                        />
                    </button>
                </div>
            </div>
            <div className="content-right__price-container mx-3">
                <div className="label">Tạm tính</div>
                <div className="price">
                    <div>
                        {price?.toLocaleString('vi-VN', {
                            maximumFractionDigits: 0,
                        })}
                    </div>
                </div>
            </div>
            <div className="content-right__group-button mx-3 mt-4">
                <Button primary>Mua Ngay</Button>
                <Button normal>Thêm Vào Giỏ Hàng</Button>
            </div>
        </div>
    );
};

export default BoxBuy;
