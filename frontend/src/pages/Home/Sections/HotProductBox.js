import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

import './HotProductBox.scss';
import CartItem from '~/components/CartItem';

const HotProductBox = ({ listHotProduct }) => {
    const CustomPrevArrow = (props) => {
        const { onClick } = props;
        return (
            <div className="custom-arrow custom-prev-arrow" onClick={onClick}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </div>
        );
    };

    const CustomNextArrow = (props) => {
        const { onClick } = props;
        return (
            <div className="custom-arrow custom-next-arrow " onClick={onClick}>
                <FontAwesomeIcon icon={faChevronRight} />
            </div>
        );
    };

    const settings = {
        // dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 5,
        slidesToScroll: 5,
        autoplay: false,
        autoplaySpeed: 3000,
        cssEase: 'linear',
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        style: {},
    };

    return (
        <div className="container-hot-product">
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
            <div className="hot-product-section mt-3">
                <div className="hot-product-content mx-4">
                    <div className="slider-container">
                        <Slider {...settings}>
                            {listHotProduct?.map((item, index) => {
                                return (
                                    <div className="customize-item ">
                                        <CartItem key={item.id} item={item} />
                                    </div>
                                );
                            })}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotProductBox;
