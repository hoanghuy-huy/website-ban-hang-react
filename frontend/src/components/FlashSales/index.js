import React from 'react';
import Slider from 'react-slick';
// import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import classNames from 'classnames/bind';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from './Header';

import styles from './FlashSales.scss';
import ProductItemFashSale from './ProductItem';
const cx = classNames.bind(styles);

function FlashSales({ props, startTime, endTime, items }) {
    const renderItem = () => items.map((item, index) => <ProductItemFashSale key={index} item={item} />);
    const CustomPrevArrow = (props) => {
        const { onClick } = props;
        return (
            <div className="custom-arrow custom-prev-arrow cursor" onClick={onClick}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </div>
        );
    };

    const CustomNextArrow = (props) => {
        const { onClick } = props;
        return (
            <div className="custom-arrow custom-next-arrow cursor" onClick={onClick}>
                <FontAwesomeIcon icon={faChevronRight} />
            </div>
        );
    };

    const settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        style: {},
    };

    return (
        <div className={cx('flash-sales-section')}>

            <div className={cx('flash-sales-content')}>
            <Header endTime={endTime} startTime={startTime} />
                <Slider {...settings} className={cx('flash-sales-slider')}>{renderItem()}</Slider>
            </div>
        </div>
    );
}

export default FlashSales;
