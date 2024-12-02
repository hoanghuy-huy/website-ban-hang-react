import React, { useState } from 'react';
import Button from '~/components/Button/Button';
import './ComparisonProduct.scss';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

function ComparisonProductBox() {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Nồi Cơm Điện Nắp Gài Nagakawa NAG031',
            price: '1.070.000',
            image: 'https://example.com/image1.jpg',
        },
        {
            id: 2,
            name: 'Nồi Cơm Điện Nắp Gài Lock&Lock',
            price: '647.000',
            image: 'https://example.com/image2.jpg',
        },
        {
            id: 3,
            name: 'Nồi Cơm Điện Sharp KS-19T',
            price: '1.420.000',
            image: 'https://example.com/image3.jpg',
        },
    ]);

    const handleDelete = (id) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    return (
        <div className="product-comparison ms-3 col-12">
            <div className="title">So sánh sản phẩm tương tự</div>

            <div className="product-comparison-table mt-3 mx-4">
                <div className="row">
                    {products.map((product, index) => (
                        <div className="col-3" key={product.id}>
                            <div className={`product-comparison-table__item ${index % 2 === 0 ? 'highlight' : ''}`}>
                                {index !== 0 && (
                                    <div className="delete-icon" onClick={() => handleDelete(product.id)}>
                                        <HighlightOffOutlinedIcon />
                                    </div>
                                )}
                                <div className="product-comparison-table__item-header">
                                    <div className="item-header__product-info">
                                        <div className="product-image">
                                            <img src={product.image} alt={product.name} />
                                        </div>
                                        <div className="product-text">
                                            <div className="product-name">{product.name}</div>
                                        </div>
                                        <div className="actions my-2">
                                            <Button normal>Thêm vào giỏ hàng</Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-comparison-table__item-attributes">
                                    <div className="item-atribute">{product.price} đ</div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="col-3">
                        <div className="product-comparison-table__add-item">
                            <div className="icon-plus">
                                <AddCircleOutlineIcon />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ComparisonProductBox;