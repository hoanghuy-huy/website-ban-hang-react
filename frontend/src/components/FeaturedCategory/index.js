import React, { useEffect } from 'react';
import Slider from 'react-slick';

import './FeaturedCategory.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategoriesHot } from '~/redux/features/categorySlice/categorySlice';
import Image from '../Image';

const FeaturedCategory = () => {
    const { categoryListHot } = useSelector((state) => state.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllCategoriesHot());
    }, []);

    const settings = {
        // dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 6,
        slidesToScroll: 6,
        fade: false,
        arrows: false,
    };
    return (
        <>
            {categoryListHot && (
                <div className="FeaturedCategory-section my-2">
                    <div className="container-fluid">
                        <h4 className="title">Danh mục nổi bật</h4>
                        <Slider {...settings} className="cat_slider-main">
                            {categoryListHot.map((item) => {
                                return (
                                    <>
                                        <div className="item">
                                            <div className="info">
                                                <Image
                                                    src={item?.urlImg}
                                                />
                                            </div>
                                        </div>
                                    </>
                                );
                            })}
                        </Slider>
                    </div>
                </div>
            )}
        </>
    );
};

export default FeaturedCategory;
