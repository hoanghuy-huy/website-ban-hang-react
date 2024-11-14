import { Rating } from '@mui/material';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalReviewProduct.scss';
import Image from '~/components/Image';
import { useDispatch } from 'react-redux';
import { customerReviewProductApi, getOneOrderApi } from '~/redux/features/orderSlice';
function ModalReviewProduct({ data, show, setShow, userId }) {
    const [stars, setStars] = useState(1);
    const [contentReview, setContentReview] = useState('');
    const dispatch = useDispatch();
    const handleClose = () => setShow(false);

    const handleCustomerReviewProduct = async () => {
        const buildData = {
            userId: userId,
            orderDetailId: data?.id,
            productId: data?.productId,
            starNumber: stars,
            content: contentReview,
        };

        await dispatch(customerReviewProductApi(buildData));
        await dispatch(getOneOrderApi(data.orderId));
        setShow(false)
    };
    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div className="header-review-product">
                            <Image src={data?.Product?.thumbnailUrl} />
                            <div className="product-wrap">
                                <div className="name">
                                    {data?.Product?.name ? data?.Product?.name : 'Tên sản phẩm'}{' '}
                                </div>
                                <div className="stars">
                                    <Rating
                                        name="simple-controlled size-large"
                                        value={stars}
                                        onChange={(event, newValue) => {
                                            setStars(newValue);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-review-product">
                        <div className="title">Đánh giá sản phẩm</div>
                        <textarea
                            className="input-review"
                            onChange={(e) => setContentReview(e.target.value)}
                            value={contentReview}
                            placeholder="Viết đánh giá"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className="w-100" onClick={handleCustomerReviewProduct}>
                        Gửi đánh giá
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalReviewProduct;
