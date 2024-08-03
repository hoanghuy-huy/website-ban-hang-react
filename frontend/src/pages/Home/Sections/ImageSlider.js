import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './ImageSlider.scss';
import Slider from 'react-slick';
const ImageSlider = () => {
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
                <FontAwesomeIcon icon={faChevronRight}  />
            </div>
        );
    };

    const settings = {
        // dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        cssEase: 'linear',
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        style: {
            
        }
    };

    return (
        <div className="image-slider-section">
            <div className="image-slider-content">
                <Slider {...settings}>
                    <div className='customize-item'>
                        <img src='https://salt.tikicdn.com/ts/tka/ef/67/6d/729b2d566ddc7d36dcb575192a56bc5f.png' alt=''/>
                    </div>
 
                    <div className='customize-item'>
                        <img src='https://salt.tikicdn.com/ts/tka/ef/67/6d/729b2d566ddc7d36dcb575192a56bc5f.png' alt=''/>
                    </div>
 
                </Slider>
            </div>
        </div>
    );
};

export default ImageSlider;
