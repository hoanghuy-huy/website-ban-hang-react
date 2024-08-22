import React from 'react';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './FeaturedCategory.scss';
const FeaturedCategory = () => {
    const settings = {
        // dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 4,
        slidesToScroll: 1,
        fade: false,
        arrows: false,
    };
    return (
        <div className="FeaturedCategory-section my-2">
            <div className="container-fluid">
                <h4 className="title">Danh mục nổi bật</h4>
                <Slider {...settings} className="cat_slider-main">
                    <div className="item">
                        <div className="info">
                            <img
                                src="https://vcdn.tikicdn.com/ts/seller/e6/d1/51/f7e8b6c959e6df9086dff65e6378d832.jpg"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="item">
                        <div className="info">
                            <img
                                src="https://salt.tikicdn.com/cache/w280/ts/tikimsp/c4/c1/51/d6e393ad26199edbc5d5edf1cebc66c7.png.webp"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="item">
                        <div className="info">
                            <img
                                src="https://salt.tikicdn.com/cache/w280/ts/tikimsp/c4/c1/51/d6e393ad26199edbc5d5edf1cebc66c7.png.webp"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="item">
                        <div className="info">
                            <img
                                src="https://salt.tikicdn.com/cache/w280/ts/tikimsp/c4/c1/51/d6e393ad26199edbc5d5edf1cebc66c7.png.webp"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="item">
                        <div className="info">
                            <img
                                src="https://salt.tikicdn.com/cache/w280/ts/tikimsp/c4/c1/51/d6e393ad26199edbc5d5edf1cebc66c7.png.webp"
                                alt=""
                            />
                        </div>
                    </div>

                </Slider>
            </div>
        </div>
    );
};

export default FeaturedCategory;
