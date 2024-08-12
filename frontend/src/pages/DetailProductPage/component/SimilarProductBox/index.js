import React from 'react';
import './SimilarProductBox.scss';
import CardItem from './CardItem';
const SimilarProductBox = ({ productList, handleFetchData }) => {
    return (
        <div className="similar-product-box-container">
            <div className="title ps-3 py-3">Sản phẩm tương tự</div>
            <div className="product-box-body">
                <div className="row mx-3">
                    {productList &&
                        productList.map((item, index) => {
                            return (
                                <div className="col-3" key={index}>
                                    <CardItem item={item} onClick={() => handleFetchData(+item.id)} />
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default SimilarProductBox;
