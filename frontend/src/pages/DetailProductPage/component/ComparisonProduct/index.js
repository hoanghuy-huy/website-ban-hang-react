import React from 'react';
import Button from '~/components/Button/Button';
import './ComparisonProduct.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
function ComparisonProduct() {
    return (
        <div className="product-comparison ms-3 col-12">
            <div className="title">So sánh sản phẩm tương tự</div>

            <div className="product-comparison-table mt-3 mx-4">
                <div className="row">
                    <div className="col-3">
                        <div className="product-comparison-table__item">
                            <div className="product-comparison-table__item-header">
                                <div className="item-header__product-info">
                                    <div className="product-image">
                                        <img
                                            src="https://salt.tikicdn.com/cache/100x100/ts/product/25/c2/ac/15c44df847b613829bfcc2d9d075b5ac.jpg.webp"
                                            alt=""
                                        />
                                    </div>
                                    <div className="product-text">
                                        <div className="product-name">
                                            Ấm Đun Siêu Tốc Inox 2 Lớp Sunhouse SHD1351 (1.8 Lít) - Hàng Chính Hãng Ấm
                                            Đun Siêu Tốc Inox 2 Lớp Sunhouse SHD1351 (1.8 Lít) - Hàng Chính Hãng
                                        </div>
                                    </div>
                                    <div className="actions my-2">
                                        <Button normal>Them vao gio hang</Button>
                                    </div>
                                </div>
                            </div>
                            <div className="product-comparison-table__item-attributes">
                                <div className="item-atribute">230.000</div>
                                <div className="item-atribute">230.000</div>
                                <div className="item-atribute">230.000</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className='product-comparison-table__add-item'>
                            <div className='icon-plus'>
                                <FontAwesomeIcon icon={faPlusCircle}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ComparisonProduct;
