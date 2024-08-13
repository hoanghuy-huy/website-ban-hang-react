import React from 'react';
import Button from '~/components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faPlus, faX } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
    handleAddItemCompare,
    handleDeleteAllItemCompare,
    handleDeleteItemCompare,
    handleShrinkFormCompare,
} from '~/redux/features/detailProductSlice';

const ComparisonProduct = () => {
    const { listProductToCompare } = useSelector((state) => state.detailProduct);
    const dispatch = useDispatch();
    const totalItems = 4;
    return (
        <div className="stick-compare">
            <ul className="list-compare d-flex position-absolute">
                {listProductToCompare.map((item) => {
                    return (
                        <li className="list-compare__add-item">
                            <div
                                className="icon-clear position-absolute top-0 end-0"
                                onClick={() => dispatch(handleDeleteItemCompare(item))}
                            >
                                <FontAwesomeIcon icon={faX} />
                            </div>
                            <div className="img-product">
                                <img style={{ height: 60, width: 60 }} src={item?.thumbnailUrl} />
                            </div>
                            <div className="name">
                                <h3>{item?.name}</h3>
                            </div>
                        </li>
                    );
                })}

                {Array.from({ length: totalItems - listProductToCompare.length }).map((_, index) => (
                    <li className="list-compare__add-item">
                        <div className="icon-add">
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                        <div>
                            <p>Thêm sản phẩm</p>
                        </div>
                    </li>
                ))}

                <li className="list-compare__add-item">
                    <div className="btn-compare me-3">
                        <Button normal>So sánh ngay</Button>
                    </div>
                    <div className="action-clear-all" onClick={() => dispatch(handleDeleteAllItemCompare())}>
                        <h3>Xóa tất cả</h3>
                    </div>
                </li>
                <div className="shrink-form">
                    <div
                        className="d-flex gap-2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => dispatch(handleShrinkFormCompare())}
                    >
                        <p> Thu Gọn</p>
                        <FontAwesomeIcon icon={faChevronDown} className="mt-1" />
                    </div>
                </div>
            </ul>
        </div>
    );
};

export default ComparisonProduct;
