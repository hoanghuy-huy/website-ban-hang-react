import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import config from '~/config';
import { convertPrice } from '~/utils/convert';
import style from './CardItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);
const CardItem = ({ item, onClick }) => {
    return (
        <Link to={config.routes.productDetail + item?.id} onClick={onClick}>
            <div className={cx('container-cart-item')}>
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
                            <div className='d-flex gap-1 py-1'>
                                <FontAwesomeIcon icon={faStar} style={{height: '12', width: '12', color:'#ffc400'}}/>
                                <FontAwesomeIcon icon={faStar} style={{height: '12', width: '12', color:'#ffc400'}}/>
                                <FontAwesomeIcon icon={faStar} style={{height: '12', width: '12', color:'#ffc400'}}/>
                                <FontAwesomeIcon icon={faStar} style={{height: '12', width: '12', color:'#ffc400'}}/>
                                <FontAwesomeIcon icon={faStar} style={{height: '12', width: '12', color:'#ffc400'}}/>

                            </div>
                        </div>
                    </div>

                    <div className={cx('price-and-discount-style')}>
                        <div className={cx('price')}>
                            {convertPrice(item?.price)}
                            <sup>₫</sup>
                        </div>
                    </div>

                </div>
            </div>
        </Link>
    );
};

export default CardItem;
