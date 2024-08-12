import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

import './ThumbnailSlider.scss';
import CartItem from '~/components/CartItem';

const ThumbnailSlider = ({ listImg }) => {
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
        // infinite: true,
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
        <div className="thumbnail-section mt-3">
            <div className="thumbnail-content mx-4">
                <div className="slider-container">
                    <Slider {...settings}>
                        {listImg?.map((item, index) => {
                            return (
                                <div className="customize-item">
                                    <img
                                        src={item.urlImage}
                                        alt="img-thumbnail"
                                        // onClick={() => handleOnClickSetImage(item)}
                                    />
                                </div>
                            );
                        })}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default ThumbnailSlider;
