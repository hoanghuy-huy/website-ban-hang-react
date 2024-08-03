import React from 'react';
import './FeaturedProductBox.scss';
import { Link } from 'react-router-dom';
import CartItem from '~/components/CartItem';

const FeaturedProductBox = ({ listProducts }) => {

    
    return (
        <div className="product-box-hot pb-3">
            <div className="product-box-header pt-3 d-flex justify-content-between align-items-center  px-3">
                <div className="title">
                    <img
                        src="https://salt.tikicdn.com/ts/upload/f8/77/0b/0923990ed377f50c3796f9e6ce0dddde.png"
                        alt="product-box-img"
                    />
                </div>
                <div className="action">
                    <Link>Xem Tất Cả</Link>
                </div>
            </div>

            <div className="product-box-content mt-4 d-flex">
                <div className="row mx-3">
                    {listProducts?.map((item, index) => {
                        return (
                            <div className="col-2" key={index}>
                                <CartItem key={item.id} item={item} />
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );
};

export default FeaturedProductBox;
