import React, { useState } from 'react';
import Button from '~/components/Button/Button';
import './BoxBuy.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from '~/redux/features/cartSlice';
import { showLoginForm } from '~/redux/features/accountSlice';

const BoxBuy = ({ item }) => {
    const userId = useSelector((state) => state.account.account.userId)
    const auth = useSelector((state) => state.account.auth);
    const [quantity, setQuantity] = useState(1);
    const originalPrice = item?.price;
    const [price, setPrice] = useState(originalPrice);
    const dispatch = useDispatch()
    const handlePrice = (_quantity) => {
        if (_quantity < 1) {
            return;
        }
        if(_quantity > 10) {
            
            return ;
        }
        setQuantity(_quantity);
        const timer = setTimeout(() => {
            setPrice(_quantity * originalPrice);
        }, 100);

        return () => {
            clearTimeout(timer);
        };
    };

    const handleAddItemToCart = (item) => {
        let productId = item.id
        if(auth) {
            dispatch(addProductToCart({productId,userId, quantity}))
            console.log(quantity,item.id,userId)
        }else {
            dispatch(showLoginForm())
        }
        
    }
    
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
                    <input type="text" value={quantity} className="input" tabIndex="-1" />
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
                <Button primary >Mua Ngay</Button>
                <Button normal outline onClick={() => handleAddItemToCart(item)}>Thêm Vào Giỏ Hàng</Button>
            </div>
        </div>
    );
};

export default BoxBuy;
