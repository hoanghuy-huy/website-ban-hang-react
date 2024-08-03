import React from 'react';
import './FilterWrapper.scss';
import Button from '../Button/Button';

const FilterWrapper = () => {
    return (
        <div className="filter-wrapper-container mt-4">
            <div className="col-12">
                <div className="row">
                    <div className="filter-wrapper__header">Tất cả sản phẩm</div>
                    <div className="filter-row d-flex align-items-center pb-3">
                        <div>
                            <div className="filter-row__name">Thương hiệu</div>
                            <div className="filter-row__value">
                                <Button rounded>Panasonic</Button>

                                <Button rounded>Panasonic</Button>
                                <Button rounded>Panasonic</Button>
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div>
                            <div className="filter-row__name">Thương hiệu</div>
                            <div className="filter-row__value">
                                <Button rounded>Panasonic</Button>
                                <Button rounded>Panasonic</Button>
                                <Button rounded>Panasonic</Button>
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div>
                            <div className="filter-row__name">Sắp xếp</div>
                            <div className="filter-row__value">
                                <Button rounded>Panasonic</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterWrapper;
