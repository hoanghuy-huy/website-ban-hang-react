import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalReturnProduct.scss';
import Image from '~/components/Image';
import { useDispatch } from 'react-redux';
import {
    customerReturnOrderApi,
    customerReviewProductApi,
    getListOrderToReturn,
    getOneOrderApi,
} from '~/redux/features/orderSlice';
import { toast } from 'react-toastify';

function ModalReturnProduct({ userId, data, show, setShow }) {
    const [contentReturn, setContentReturn] = useState('');
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    const handleClose = () => {
        setShow(false);
        setContentReturn('');
        setQuantity(1);
    };

    const handleIncrease = () => {
        if (data.quantity === quantity) {
            toast.info('Vượt quá số lượng sản phẩm đã mua');
            return;
        }
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecrease = () => {
        setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const handleCustomerRequestReturnOrder = async () => {
        await dispatch(
            customerReturnOrderApi({
                orderDetailId: data.id,
                quantityReturn: quantity,
                contentReturn: contentReturn,
            }),
        );

        await dispatch(getListOrderToReturn({ userId }));

        setShow(false);
    };

    return (
        <>
            <Modal show={show} animation={false}>
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title>
                        <div className="header-review-product">
                            <Image src={data?.Product?.thumbnailUrl} />
                            <div className="product-wrap">
                                <div className="name">{data?.Product?.name ? data?.Product?.name : 'Tên sản phẩm'}</div>
                                <div className="stars"></div>
                            </div>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-review-product">
                        <div>
                            <div className="title">Lý do trả hàng</div>
                            <textarea
                                className="input-review"
                                onChange={(e) => setContentReturn(e.target.value)}
                                value={contentReturn}
                                placeholder="Viết lý do trả hàng"
                            />
                        </div>
                        <div className="quantity-box">
                            <div className="title">Số lượng</div>
                            <div className="item-quantity mt-2">
                                <div className="quantity">
                                    <span className="decrease" onClick={handleDecrease}>
                                        <img
                                            src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/decrease.svg"
                                            alt="decrease"
                                        />
                                    </span>
                                    <input type="tel" className="input" readOnly value={quantity} />
                                    <span className="increase" onClick={handleIncrease}>
                                        <img
                                            src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/increase.svg"
                                            alt="increase"
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className="w-100" onClick={() => handleCustomerRequestReturnOrder()}>
                        Xác nhận trả hàng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalReturnProduct;
