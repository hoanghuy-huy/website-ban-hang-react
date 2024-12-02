import React, { useEffect, useRef, useState } from 'react';
import './ReviewPage.scss';
import { Rating } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getListOrderToReview } from '~/redux/features/orderSlice';
import ModalReviewProduct from '../OrderDetailPage/ModalReviewProduct';
const ReviewPage = () => {
    const dispatch = useDispatch();
    const listOrderToReview = useSelector((state) => state.order.listOrderToReview);
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState('');
    const { userId } = useSelector((state) => state.account.account);
    // const [star, setStar] = useState(0)
    const starRefs = useRef({});
    const handleSetValueStar = async (star, item) => {
        // await setStar(star)
        starRefs.current[item.id] = star;
        setData(item);
        await setShowModal(true);
    };
    useEffect(() => {
        dispatch(getListOrderToReview({ userId: userId }));
    }, []);

    return (
        <>
            <div className="ReviewPage">
                <div className="ReviewPage-container">
                    <h3 className="title">Đánh giá sản phẩm</h3>
                    <div className="list-review-container row">
                        {listOrderToReview && listOrderToReview.length > 0 ? (
                            listOrderToReview.map((order) => (
                                <>
                                    <div className="review-item bg-white col-3">
                                        <div className="product-info">
                                            <div className="img-container">
                                                <img
                                                    src={order.Product.thumbnailUrl}
                                                    alt={order.Product.thumbnailUrl}
                                                />
                                            </div>
                                            <div className="name-product">{order.Product.name}</div>
                                        </div>
                                        <div className="rating ">
                                            <Rating
                                                name={`size-large-${order.id}`}
                                                value={starRefs.current[order.id] || 0}
                                                onChange={(e) => handleSetValueStar(e.target.value, order)}
                                                size="large"
                                            />
                                        </div>
                                    </div>
                                </>
                            ))
                        ) : (
                            <div className="no-review card shadow p-3">Chưa có đánh giá nào</div>
                        )}
                    </div>
                </div>
            </div>

            <ModalReviewProduct
                userId={userId}
                show={showModal}
                setShow={setShowModal}
                data={data}
                id={data.id}
                star={starRefs.current[data.id] || 0}
            />
        </>
    );
};

export default ReviewPage;
