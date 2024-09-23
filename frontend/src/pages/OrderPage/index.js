import React, { useEffect, useState } from 'react';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import Button from '~/components/Button/Button';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import './OrderPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrderWithUserIdApi } from '~/redux/features/orderSlice';
import { convertPrice } from '~/utils/convert';
import { Link } from 'react-router-dom';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
const OrderPage = () => {
    const dispatch = useDispatch();
    const { orderList } = useSelector((state) => state.order);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(3);
    const { userId } = useSelector((state) => state.account.account);
    const { totalPages, totalItems, orders } = orderList;
    useEffect(() => {
        dispatch(getAllOrderWithUserIdApi({ limit: limit, page: currentPage, userId: userId }));
    }, []);
    return (
        <div className="OrderPage">
            <div className="OrderPage-container">
                <div className="heading mb-4">
                    <h5 className="title">Đơn hàng của tôi</h5>
                </div>
                <div className="content">
                    <div className="StyledTab mb-4">
                        <div className="StyledTab-item active col-2">Tất cả đơn hàng</div>
                        <div className="StyledTab-item col-2">Đang xử lý</div>
                        <div className="StyledTab-item col-2">Đang vận chuyển</div>
                        <div className="StyledTab-item col-2">Đã giao</div>
                        <div className="StyledTab-item col-2">Đã hủy</div>
                    </div>
                    <div className="StyledOrder">
                        <div className="StyledOrder-container">
                            {orders &&
                                orders.length > 0 &&
                                orders.map((item) => {
                                    return (
                                        <>
                                            <div className="OrderItem">
                                                <div className="heading">
                                                    <div className="title">
                                                        {item?.status === 0 ? (
                                                            <>
                                                                <HourglassEmptyOutlinedIcon />
                                                                Đang xử lý
                                                            </>
                                                        ) : (
                                                            <>
                                                                <CheckOutlinedIcon />
                                                                Đã xác nhận
                                                            </>
                                                        )}
                                                        {/* <LocalShippingOutlinedIcon /> Đặt hàng thành công */}
                                                    </div>
                                                </div>
                                                {item.OrderDetails.map((product) => {
                                                    return (
                                                        <div className="ProductItems">
                                                            <div className="ProductItem">
                                                                <div className="product-info">
                                                                    <div className="img">
                                                                        <img src={product?.Product?.thumbnailUrl} />
                                                                        <div className="quantity">
                                                                            x{product.quantity}
                                                                        </div>
                                                                    </div>
                                                                    <div className="name">{product?.Product?.name}</div>
                                                                </div>
                                                                <div className="price">
                                                                    {convertPrice(product?.price)} ₫
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}

                                                <div className="FooterAction">
                                                    <div className="FooterAction-container">
                                                        <div className="total-price">
                                                            <span>Tổng tiền: </span>
                                                            {convertPrice(item?.totalPrice)} ₫
                                                        </div>

                                                        <div className="actions mt-2 mx-2">
                                                            <Link to={'/account/order/order-detail/' + item?.id}>
                                                                <Button outline>Xem chi tiết</Button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
