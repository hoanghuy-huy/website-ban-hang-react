import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import config from '~/config';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import style from './CartItem.module.scss';
import { IconButton, Rating, Tooltip } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
const cx = classNames.bind(style);
const CartItem = ({ item, onClick }) => {
    console.log(item);
    return (
        <>
            <div className={cx('card-item')} style={{ position: 'relative' }}>
                <Link
                    to={config.routes.productDetail + item?.id}
                    onClick={onClick}
                    className={cx('container-cart-item')}
                >
                    <img className={cx('img-product')} src={item?.thumbnailUrl} alt="img-product" />
                    <div className={cx('information-cart-item')}>
                        <div className={cx('icon')}>
                            <div className={cx('icon-top-deal')}>
                                {item?.hot ? (
                                    <img
                                        src="https://salt.tikicdn.com/ts/upload/0f/59/82/795de6da98a5ac81ce46fb5078b65870.png"
                                        alt="img-top-deal"
                                    />
                                ) : (
                                    <></>
                                )}
                            </div>
                            <div className={cx('icon-authentic')}>
                                {item?.authentic ? (
                                    <img
                                        src="https://salt.tikicdn.com/ts/upload/d7/56/04/b93b8c666e13f49971483596ef14800f.png"
                                        alt="img-top-deal"
                                    />
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                        <div className={cx('icon-genuine')}>
                            {item?.genuine ? (
                                <img
                                    src="https://salt.tikicdn.com/ts/tka/69/cf/22/1be823299ae34c7ddcd922e73abd4909.png"
                                    alt="img-genuine"
                                />
                            ) : (
                                <div></div>
                            )}
                        </div>
                        <div className={cx('title')}>{item?.name}</div>

                        <div className={cx('average-rating')}>
                            <div className={cx('number-start-container')}>
                                <div className="d-flex gap-1 py-1 ">
                                    <Rating name="read-only" value={item?.starsNumber} readOnly />
                                </div>
                            </div>
                        </div>

                        <div className={cx('price-and-discount-style')}>
                            <div className={cx('price')}>
                                {item?.price.toLocaleString('vi-VN', {
                                    maximumFractionDigits: 0,
                                })}
                                <sup>₫</sup>
                            </div>
                            <div className={cx('discount')}>
                                {item.discountRate === 0 ? (
                                    <>
                                        <span className={cx('discount-rate')}>
                                            <sup></sup>
                                        </span>
                                        <span className={cx('original-price')}>
                                            <sup></sup>
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span className={cx('discount-rate')}>
                                            {item?.discountRate}
                                            <sup>%</sup>
                                        </span>
                                        <span className={cx('original-price')}>
                                            {item?.originalPrice.toLocaleString('vi-VN', {
                                                maximumFractionDigits: 0,
                                            })}
                                            <sup>₫</sup>
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </Link>
                <div
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        fontSize: 20,
                        cursor: 'pointer',
                        color: 'var(--primary-color)',
                    }}
                >
                    <Tooltip title="Thêm vào yêu thích">
                        <IconButton color="primary" aria-label="add to shopping cart">
                            <FavoriteBorderOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </div>
                <div className={cx('add-to-cart')}>
                    <Tooltip title="Thêm vào giỏ hàng">
                        <IconButton color="primary" aria-label="add to shopping cart">
                            <ShoppingCartOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </>
    );
};

export default CartItem;
