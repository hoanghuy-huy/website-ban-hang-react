import React, { useState } from 'react';
import './Sidebar.scss';
import Image from '~/components/Image';

const Sidebar = ({ listImg }) => {
    const defaultImage = listImg && listImg[0] ? listImg[0].urlImageLarge : '';
    const defaultActive = listImg && listImg[0] ? listImg[0].id : '';
    const [slider, setSlider] = useState(defaultImage);
    const [active, setActive] = useState(defaultActive);
    const handleOnClickSetImage = (item) => {
        setActive(item?.id);
        setSlider(item?.urlImageLarge);
    };
    return (
        <div className="content-left col-3 ms-3">
            <div className="product-img ps-4">
                <div className="img-frame">
                    <Image src={slider} alt="img-product" />
                </div>
            </div>
            {/* <div className="product-img-thumbnail">
                <div className="content">
                    <ThumbnailSlider listImg={listImg}/>
                </div>
            </div> */}
            <div className="product-img-thumbnail">
                <div className="content">
                    <div className="slider-container">
                        {listImg?.map((item, index) => {
                            return (
                                <div className={active === item.id ?"item-thumbnail active" : "item-thumbnail"} key={index}>
                                    <Image
                                        src={item?.urlImage}
                                        alt="img-thumbnail"
                                        onClick={() => handleOnClickSetImage(item)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
