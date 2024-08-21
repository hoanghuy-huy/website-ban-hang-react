import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
import { convertPrice } from '~/utils/convert';

const cx = classNames.bind(styles);

function ProductItemFashSale({ item }) {
    return (
        <div className={cx('card-item-flash-sale-container')}>
            <div className={cx('content-item')}>
                <img src={item?.thumbnailUrl} alt="item" />
                <div className={cx('item-info')}>
                    <h3 className={cx('title')}>{item?.name}</h3>
                    <span className={cx('price')}>
                        <strong>{convertPrice(item?.price)}</strong>
                        <strike>{item?.discountPrice}</strike>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ProductItemFashSale;
