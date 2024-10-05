import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';

import './OrderDetailPage.scss';
import { cancelOrderApi, getOneOrderApi } from '~/redux/features/orderSlice';
import {  useNavigate, useParams } from 'react-router-dom';
import { convertPrice } from '~/utils/convert';
import Image from '~/components/Image';
const OrderDetailPage = () => {
    const { orderItem } = useSelector((state) => state.order);
    const { userId } = useSelector((state) => state.account.account);
    const { OrderDetails } = orderItem;
    const { orderId } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();

    let totalPriceForEachProduct = (price, quantity) => {
        return price * quantity
    }
    
    let totalPriceForOrder = () => {
        if(!OrderDetails) return 0
        let total = OrderDetails.reduce((totalPrice, currentValue) => {
            return totalPrice += currentValue.quantity * currentValue.price
        },0)

        return total
    }

    const handleCancelOrder = async(orderId) => {
        let productList = orderItem?.OrderDetails.map((item) => {
            return {
                productId: item.productId,
                quantity: item.quantity
            }
        })

        await dispatch(cancelOrderApi({orderId,userId,productList}))

        navigate('/account/order')
    }
    useEffect(() => {
        dispatch(getOneOrderApi(orderId));


    }, []);
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
                        <th>Tạm tính</th>
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
                                                <div className="product-name">
                                                    {' '}
                                                    {item?.Product?.name}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="price">{convertPrice(item?.price)} ₫</td>
                                    <td className="quantity">{item?.quantity}</td>
                                    <td className="discount-amount">{item?.discount} ₫</td>
                                    <td className="total">{convertPrice(totalPriceForEachProduct(item?.price, item?.quantity))} ₫</td>
                                </tr>
                            );
                        })}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="4">
                            <span>Tạm tính</span>
                        </td>
                        <td>{convertPrice(totalPriceForOrder())} ₫</td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <span>Phí vận chuyển</span>
                        </td>
                        <td>{convertPrice(orderItem?.deliveryMethodFee)}₫</td>
                    </tr>
                    {/* <tr>
                        <td colspan="4">
                            <span>Khuyến mãi vận chuyển</span>
                        </td>
                        <td>-15.000 ₫</td>
                    </tr> */}
                    <tr>
                        <td colspan="4">
                            <span>Tổng cộng</span>
                        </td>
                        <td>
                            <span className="sum">{convertPrice(orderItem?.totalPrice)} ₫</span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4"></td>
                        <td>
                            <div title="Hủy đơn hàng" className="cancel-order" onClick={() => handleCancelOrder(orderItem?.id)}>
                                <Button variant="contained" color="warning">
                                    Hủy đơn hàng
                                </Button>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default OrderDetailPage;
