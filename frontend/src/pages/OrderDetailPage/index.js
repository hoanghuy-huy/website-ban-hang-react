import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { customerReturnOrderApi, getAllStatusOrderWithUserIdApi } from '~/redux/features/orderSlice';
import './OrderDetailPage.scss';
import { cancelOrderApi, getOneOrderApi } from '~/redux/features/orderSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { convertPrice } from '~/utils/convert';
import Image from '~/components/Image';
import ModalReviewProduct from './ModalReviewProduct';
const OrderDetailPage = () => {
    const { orderItem } = useSelector((state) => state.order);
    const { userId } = useSelector((state) => state.account.account);
    const { OrderDetails } = orderItem;
    const { orderId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [dataModal,setDataModal] = useState({})
    const [showModal,setShowModal] = useState(false)

    let totalPriceForEachProduct = (price, quantity) => {
        return price * quantity;
    };

    let totalPriceForOrder = () => {
        if (!OrderDetails) return 0;
        let total = OrderDetails.reduce((totalPrice, currentValue) => {
            return (totalPrice += currentValue.quantity * currentValue.price);
        }, 0);

        return total;
    };

    const handleCancelOrder = async (orderId) => {
        let productList = orderItem?.OrderDetails.map((item) => {
            return {
                productId: item.productId,
                quantity: item.quantity,
            };
        });

        await dispatch(cancelOrderApi({ orderId, userId, productList }));

        navigate('/account/order');
    };
    const handleCustomerReturnOrder = async (orderId, productId, productQuantity) => {
        await dispatch(
            customerReturnOrderApi({ orderId: orderId, productId: productId, productQuantity: productQuantity }),
        );

        await dispatch(getOneOrderApi(orderId));
    };
    useEffect(() => {
        dispatch(getOneOrderApi(orderId));
    }, []);
    
    // const handleShowModalReviewProduct = async (item) => {
    //     await setDataModal(item);
    //     await setShowModal(true)
    //     console.log(item)
    // }
    return (
        <div className="AccountOrderDetail">
            <div className="heading">
                <span>Chi tiết đơn hàng #{orderItem?.id}</span>
                <span className="split">-</span>
                <span className="status">{orderItem?.status ? 'Đã được duyệt' : 'Đang xử lý'}</span>
            </div>
            <div className="StyleGroupSection d-flex">
                <div className="StyleSection col-4">
                    <div className="title">Địa chỉ người nhận</div>
                    <div className="content">
                        <p className="name">{orderItem?.recipientName}</p>
                        <p className="address">
                            <span>Địa chỉ: </span>
                            {orderItem?.address}
                        </p>
                        <p className="phone">
                            <span>Điện thoại: </span>
                            {orderItem?.phone}
                        </p>
                    </div>
                </div>
                <div className="StyleSection col-4">
                    <div className="title">Hình thức giao hàng</div>
                    <div className="content">
                        <p>
                            <span> {orderItem?.deliveryMethodName}</span>
                        </p>

                        <p>Phí vận chuyển: {convertPrice(orderItem?.deliveryMethodFee)}đ</p>
                    </div>
                </div>
                <div className="StyleSection col-4" style={{ width: 335 }}>
                    <div className="title">Hình thức thanh toán</div>
                    <div className="content">
                        <div className="content">
                            {orderItem?.paymentMethod === 'cash' && <p>Thanh toán tiền mặt khi nhận hàng</p>}
                            {orderItem?.paymentMethod === 'paypal' && <p>Đã thanh toán bằng paypal</p>}
                            {orderItem?.paymentMethod === 'momo' && <p>Đã thanh toán bằng momo</p>}
                        </div>
                    </div>
                </div>
            </div>
            <table className="table-product-list">
                <thead>
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Giảm giá</th>
                        <th colSpan={2}>Tạm tính</th>
                        {/* <th>Hành động</th> */}
                    </tr>
                </thead>
                <tbody>
                    {OrderDetails &&
                        OrderDetails.length > 0 &&
                        OrderDetails.map((item) => {
                            return (
                                <tr>
                                    <td>
                                        <div className="product-item d-flex">
                                            <div className="product-item-img">
                                                <Image src={item?.Product?.thumbnailUrl} />
                                            </div>
                                            <div className="product-info  d-flex align-items-center">
                                                <div className="product-name"> {item?.Product?.name}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="price">{convertPrice(item?.price)} ₫</td>
                                    <td className="quantity">{item?.quantity}</td>
                                    <td className="discount-amount">{item?.discount} ₫</td>
                                    <td className="total" colSpan={2}>
                                        {convertPrice(totalPriceForEachProduct(item?.price, item?.quantity))} ₫
                                    </td>
                                        {/* <td className='d-flex flex-column justify-content-center align-item-center'>
                                            {orderItem.orderStatus === 1 && orderItem.statusReturnProduct === null && item.statusReview === null && (
                                                <div className="review-btn">
                                                    <Button
                                                        size="small"
                                                        outline
                                                        className="info-btn"
                                                        onClick={() => handleShowModalReviewProduct(item)}
                                                    >
                                                        Đánh giá
                                                    </Button>
                                                </div>
                                            )}
                                            {item.statusReview && (
                                                <div className="d-flex justify-content-center align-items-center ps-4 pt-2">
                                                    <span className="d-block">Đã đánh giá</span>
                                                </div>
                                            )}
                                            {orderItem.orderStatus === 1 &&
                                                orderItem.statusReturnProduct === null &&
                                                item.returnItem === null && (
                                                    <div className="return-btn mt-2">
                                                        <Button
                                                            size="small"
                                                            outline
                                                            className="info-btn"
                                                            onClick={() =>
                                                                handleCustomerReturnOrder(
                                                                    orderItem.id,
                                                                    item?.productId,
                                                                    item?.quantity,
                                                                )
                                                            }
                                                        >
                                                            Trả hàng
                                                        </Button>
                                                    </div>
                                                )}
                                            {item.returnItem && (
                                                <div className="d-flex justify-content-center align-items-center ps-4 pt-2">
                                                    <span className="d-block">Đã trả hàng</span>
                                                </div>
                                            )}
                                        </td> */}
                                </tr>
                            );
                        })}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="5">
                            <span>Tạm tính</span>
                        </td>

                        <td>{convertPrice(totalPriceForOrder())} ₫</td>
                    </tr>
                    <tr>
                        <td colspan="5">
                            <span>Phí vận chuyển</span>
                        </td>
                        <td>{convertPrice(orderItem?.deliveryMethodFee)}₫</td>
                    </tr>
                    {/* <tr>
                        <td colspan="5">
                            <span>Khuyến mãi vận chuyển</span>
                        </td>
                        <td>-15.000 ₫</td>
                    </tr> */}
                    <tr>
                        <td colspan="5">
                            <span>Tổng cộng</span>
                        </td>
                        <td>
                            <span className="sum">{convertPrice(orderItem?.totalPrice)} ₫</span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="5"></td>
                        <td>
                            <div
                                title="Hủy đơn hàng"
                                className="cancel-order"
                                onClick={() => handleCancelOrder(orderItem?.id)}
                            >
                                {orderItem &&
                                    orderItem?.orderStatusDelivery !== 1 &&
                                    orderItem?.orderStatus === null && (
                                        <Button variant="contained" color="warning">
                                            Hủy đơn hàng
                                        </Button>
                                    )}
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>

            <ModalReviewProduct userId={userId} show={showModal} setShow={setShowModal} data={dataModal}/>
        </div>
    );
};

export default OrderDetailPage;
