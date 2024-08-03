import React, { useState } from 'react';
import './Sidebar.scss';
const Sidebar = ({ listImg }) => {
    const defaultImage = listImg && listImg[0] ? listImg[0].urlImageLarge : '' 
    const [slider, setSlider] = useState(defaultImage)

    return (
        <div className="content-left col-3 ms-3">
            <div className="product-img ps-4">
                <div className="img-frame">
                    <img
                        src={slider}
                        alt="img-product"
                    />
                </div>
            </div>
            <div className="product-img-thumbnail">
                <div className="content">
                    <div className="slider-container">
                        {listImg?.map((item, index) => {
                            return (
                                <div className="item-thumbnail">
                                    <img src={item.urlImage} alt="img-thumbnail" onClick={() => setSlider(item.urlImageLarge)}/>
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
