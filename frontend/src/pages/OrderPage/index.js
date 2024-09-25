import React, { useEffect, useState } from 'react';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import Button from '~/components/Button/Button';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import DoDisturbAltOutlinedIcon from '@mui/icons-material/DoDisturbAltOutlined';
import './OrderPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllOrderDeliveryWithUserIdApi,
    getAllOrderWithUserIdApi,
    getAllStatusOrderWithUserIdApi,
    handleChoseActionToFetchApiOrder,
} from '~/redux/features/orderSlice';
import { convertPrice } from '~/utils/convert';
import { Link } from 'react-router-dom';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import {
    FETCH_ALL_ORDER,
    FETCH_ALL_ORDER_DELIVERY,
    FETCH_ALL_ORDER_PENDING,
    FETCH_STATUS_CANCEL_ORDER,
    FETCH_STATUS_ORDER,
    FETCH_STATUS_SUCCESS_ORDER,
} from '~/utils/constants';
const OrderPage = () => {
    const dispatch = useDispatch();
    const { orderList, actionFetchApi } = useSelector((state) => state.order);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(3);
    const { userId } = useSelector((state) => state.account.account);
    const { totalPages, totalItems, orders } = orderList;

    console.log(actionFetchApi);
    useEffect(() => {
        if (actionFetchApi.type === FETCH_ALL_ORDER) {
            dispatch(getAllOrderWithUserIdApi({ limit: limit, page: currentPage, userId: userId }));
        } else if (actionFetchApi.type === FETCH_ALL_ORDER_PENDING) {
            dispatch(getAllOrderWithUserIdApi({ limit: limit, page: currentPage, userId: userId, pending: true }));
        } else if (actionFetchApi.type === FETCH_ALL_ORDER_DELIVERY) {
            dispatch(getAllOrderDeliveryWithUserIdApi({ limit: limit, page: currentPage, userId: userId }));
        } else if (actionFetchApi.type === FETCH_STATUS_CANCEL_ORDER) {
            dispatch(
                getAllStatusOrderWithUserIdApi({ limit: limit, page: currentPage, userId: userId, status: false }),
            );
        } else if (actionFetchApi.type === FETCH_STATUS_SUCCESS_ORDER) {
            dispatch(getAllStatusOrderWithUserIdApi({ limit: limit, page: currentPage, userId: userId, status: true }));
        } else {
            dispatch(getAllOrderWithUserIdApi({ limit: limit, page: currentPage, userId: userId }));
        }
    }, []);

    useEffect(() => {
        if (actionFetchApi.type === FETCH_ALL_ORDER) {
            dispatch(getAllOrderWithUserIdApi({ limit: limit, page: currentPage, userId: userId }));
        } else if (actionFetchApi.type === FETCH_ALL_ORDER_PENDING) {
            dispatch(getAllOrderWithUserIdApi({ limit: limit, page: currentPage, userId: userId, pending: true }));
        } else if (actionFetchApi.type === FETCH_ALL_ORDER_DELIVERY) {
            dispatch(getAllOrderDeliveryWithUserIdApi({ limit: limit, page: currentPage, userId: userId }));
        } else if (actionFetchApi.type === FETCH_STATUS_CANCEL_ORDER) {
            dispatch(
                getAllStatusOrderWithUserIdApi({ limit: limit, page: currentPage, userId: userId, status: false }),
            );
        } else if (actionFetchApi.type === FETCH_STATUS_SUCCESS_ORDER) {
            dispatch(getAllStatusOrderWithUserIdApi({ limit: limit, page: currentPage, userId: userId, status: true }));
        } else {
            dispatch(getAllOrderWithUserIdApi({ limit: limit, page: currentPage, userId: userId }));
        }
    }, [actionFetchApi]);

    const handleSelectActionToFetchApi = (type) => {
        dispatch(handleChoseActionToFetchApiOrder(type));
    };

    return (
        <div className="OrderPage">
            <div className="OrderPage-container">
                <div className="heading mb-4">
                    <h5 className="title">Đơn hàng của tôi</h5>
                </div>
                <div className="content">
                    <div className="StyledTab mb-4">
                        <div
                            className={
                                actionFetchApi.type === FETCH_ALL_ORDER
                                    ? 'StyledTab-item active col-2'
                                    : 'StyledTab-item col-2'
                            }
                            onClick={() => handleSelectActionToFetchApi({ type: FETCH_ALL_ORDER })}
                        >
                            Tất cả đơn hàng
                        </div>
                        <div
                            className={
                                actionFetchApi.type === FETCH_ALL_ORDER_PENDING
                                    ? 'StyledTab-item active col-2'
                                    : 'StyledTab-item col-2'
                            }
                            onClick={() => handleSelectActionToFetchApi({ type: FETCH_ALL_ORDER_PENDING })}
                        >
                            Đang xử lý
                        </div>
                        <div
                            className={
                                actionFetchApi.type === FETCH_ALL_ORDER_DELIVERY
                                    ? 'StyledTab-item active col-2'
                                    : 'StyledTab-item col-2'
                            }
                            onClick={() => handleSelectActionToFetchApi({ type: FETCH_ALL_ORDER_DELIVERY })}
                        >
                            Đang vận chuyển
                        </div>
                        <div
                            className={
                                actionFetchApi.type === FETCH_STATUS_SUCCESS_ORDER
                                    ? 'StyledTab-item active col-2'
                                    : 'StyledTab-item col-2'
                            }
                            onClick={() => handleSelectActionToFetchApi({ type: FETCH_STATUS_SUCCESS_ORDER })}
                        >
                            Đã giao
                        </div>
                        <div
                            className={
                                actionFetchApi.type === FETCH_STATUS_CANCEL_ORDER
                                    ? 'StyledTab-item active col-2'
                                    : 'StyledTab-item col-2'
                            }
                            onClick={() => handleSelectActionToFetchApi({ type: FETCH_STATUS_CANCEL_ORDER })}
                        >
                            Đã hủy
                        </div>
                    </div>
                    <div className="StyledOrder">
                        <div className="StyledOrder-container">
                            {orders && orders.length > 0 ? (
                                orders.map((item) => {
                                    return (
                                        <>
                                            <div className="OrderItem">
                                                <div className="heading">
                                                    <div className="title">
                                                        {item?.status === 0 ? (
                                                            <>
                                                                {item?.orderStatus === 0 ? (
                                                                    <>
                                                                        <DoDisturbAltOutlinedIcon />
                                                                        Đã hủy
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <HourglassEmptyOutlinedIcon />
                                                                        Đang xử lý
                                                                    </>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <>
                                                                {item?.orderStatusDelivery ? (
                                                                    <>
                                                                        {item?.orderStatus ? (
                                                                            <>
                                                                                <LocalShippingOutlinedIcon />
                                                                                Giao thành Công
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <LocalShippingOutlinedIcon /> Đang vận
                                                                                chuyển
                                                                            </>
                                                                        )}
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <CheckOutlinedIcon />
                                                                        Đã xác nhận
                                                                    </>
                                                                )}
                                                            </>
                                                        )}
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
                                })
                            ) : (
                                <div className="OrderEmpty">
                                    <div className="OrderEmpty-container">
                                        <img src="https://frontend.tikicdn.com/_desktop-next/static/img/account/empty-order.png" />
                                        <p>Chưa có đơn hàng</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
