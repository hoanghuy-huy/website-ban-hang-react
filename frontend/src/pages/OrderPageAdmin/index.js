import React, { useEffect, useState } from 'react';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import Button from '~/components/Button/Button';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import DoDisturbAltOutlinedIcon from '@mui/icons-material/DoDisturbAltOutlined';
import './OrderPageAdmin.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
    cancelOrderApi,
    cancelOrderApiAdmin,
    confirmOrderAdmin,
    confirmOrderForShipmentAdmin,
    getAllOrder,
    getAllOrderDeliveryWithUserIdApi,
    getAllOrderWithUserIdApi,
    getAllStatusOrderWithUserIdApi,
    handleChoseActionToFetchApiOrder,
} from '~/redux/features/orderSlice';
import { convertPrice } from '~/utils/convert';
import { Link, useNavigate } from 'react-router-dom';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import {
    FETCH_ALL_ORDER,
    FETCH_ALL_ORDER_DELIVERY,
    FETCH_ALL_ORDER_PENDING,
    FETCH_ALL_ORDER_SHIPPING,
    FETCH_STATUS_CANCEL_ORDER,
    FETCH_STATUS_ORDER,
    FETCH_STATUS_SUCCESS_ORDER,
    ROLE_MANAGER,
} from '~/utils/constants';
const OrderPageAdmin = () => {
    const dispatch = useDispatch();
    const { orderListAdmin, actionFetchApi } = useSelector((state) => state.order);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(3);
    const { userId } = useSelector((state) => state.account.account);
    const role = useSelector((state) => state.account.account.userGroup);
    const { totalPages, totalItems, orders } = orderListAdmin;
    const navigate = useNavigate();

    useEffect(() => {
        if (actionFetchApi.type === FETCH_ALL_ORDER) {
            dispatch(getAllOrder({ limit: limit, page: currentPage }));
        } else if (actionFetchApi.type === FETCH_ALL_ORDER_PENDING) {
            dispatch(getAllOrder({ limit: limit, page: currentPage, pending: true }));
        } else if (actionFetchApi.type === FETCH_ALL_ORDER_DELIVERY) {
            dispatch(getAllOrder({ limit: limit, page: currentPage, pendingShipment: true }));
        } else if (actionFetchApi.type === FETCH_STATUS_CANCEL_ORDER) {
            dispatch(getAllOrder({ limit: limit, page: currentPage, orderStatus: false }));
        } else if (actionFetchApi.type === FETCH_STATUS_SUCCESS_ORDER) {
            dispatch(getAllOrder({ limit: limit, page: currentPage, orderStatus: true }));
        } else {
            dispatch(getAllOrder({ limit: limit, page: currentPage }));
        }
    }, []);

    useEffect(() => {
        if (actionFetchApi.type === FETCH_ALL_ORDER) {
            dispatch(getAllOrder({ limit: limit, page: currentPage }));
        } else if (actionFetchApi.type === FETCH_ALL_ORDER_PENDING) {
            dispatch(getAllOrder({ limit: limit, page: currentPage, pending: true }));
        } else if (actionFetchApi.type === FETCH_ALL_ORDER_DELIVERY) {
            dispatch(getAllOrder({ limit: limit, page: currentPage, pendingShipment: false }));
        } else if (actionFetchApi.type === FETCH_STATUS_CANCEL_ORDER) {
            dispatch(getAllOrder({ limit: limit, page: currentPage, orderStatus: false }));
        } else if (actionFetchApi.type === FETCH_STATUS_SUCCESS_ORDER) {
            dispatch(getAllOrder({ limit: limit, page: currentPage, orderStatus: true }));
        } else if (actionFetchApi.type === FETCH_ALL_ORDER_SHIPPING) {
            dispatch(getAllOrder({ limit: limit, page: currentPage, pendingShipment: true }));
        }
    }, [actionFetchApi]);

    const handleSelectActionToFetchApi = (type) => {
        dispatch(handleChoseActionToFetchApiOrder(type));
    };

    const handleCancelOrder = async (orderId) => {
        let productList = await orders
            .find((item) => item.id === orderId)
            .OrderDetails.map((item) => {
                return {
                    productId: item.productId,
                    quantity: item.quantity,
                };
            });

        await dispatch(cancelOrderApiAdmin({ orderId, productList }));

        // navigate('/manager/order')
        window.location.reload();
    };

    const confirmOrderFunc = async (orderId) => {
        dispatch(confirmOrderAdmin({ orderId, page: currentPage }));

        window.location.reload();
    };

    const confirmOrderForShipmentFunc = async (orderId) => {
        dispatch(confirmOrderForShipmentAdmin({ orderId, page: currentPage }));

        window.location.reload();
    };

    return (
        <div className="OrderPageAdmin">
            <div className="OrderPageAdmin-container">
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
                            Chưa duyệt
                        </div>
                        <div
                            className={
                                actionFetchApi.type === FETCH_ALL_ORDER_DELIVERY
                                    ? 'StyledTab-item active col-2'
                                    : 'StyledTab-item col-2'
                            }
                            onClick={() => handleSelectActionToFetchApi({ type: FETCH_ALL_ORDER_DELIVERY })}
                        >
                            Giao hàng ngay
                        </div>
                        <div
                            className={
                                actionFetchApi.type === FETCH_ALL_ORDER_SHIPPING
                                    ? 'StyledTab-item active col-2'
                                    : 'StyledTab-item col-2'
                            }
                            onClick={() => handleSelectActionToFetchApi({ type: FETCH_ALL_ORDER_SHIPPING })}
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
                            Đã giao thành công
                        </div>
                        <div
                            className={
                                actionFetchApi.type === FETCH_STATUS_CANCEL_ORDER
                                    ? 'StyledTab-item active col-2'
                                    : 'StyledTab-item col-2'
                            }
                            onClick={() => handleSelectActionToFetchApi({ type: FETCH_STATUS_CANCEL_ORDER })}
                        >
                            Đã từ chối
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
                                                                {item?.orderStatus == 0 ? (
                                                                    <>
                                                                        <DoDisturbAltOutlinedIcon />
                                                                        Đã từ chối đơn hàng
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
                                                                                <LocalShippingOutlinedIcon /> 
                                                                                Đang trên đường vận chuyển                                                                             </>
                                                                        )}
                                                                    </>
                                                                ) : (

                                                                    <>
                                                                        <CheckOutlinedIcon />
                                                                        Đã xác nhận, đang đợi giao hàng
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
                                                            {role === ROLE_MANAGER ? (
                                                                <>
                                                                    {item.orderStatus === 0 ||
                                                                        (item.orderStatus === 1 ? (
                                                                            <></>
                                                                        ) : item.orderStatusDelivery === 1 && item.status === 1? (
                                                                            <></>
                                                                        ) : (
                                                                            <>
                                                                                <div className="d-flex">
                                                                                    {item?.orderStatusDelivery === 0 &&
                                                                                    item?.status === 1 ? (
                                                                                        <Button
                                                                                            normal
                                                                                            onClick={() =>
                                                                                                confirmOrderForShipmentFunc(
                                                                                                    item?.id,
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            Giao hàng
                                                                                        </Button>
                                                                                    ) : (
                                                                                        <Button
                                                                                            onClick={() =>
                                                                                                confirmOrderFunc(
                                                                                                    item?.id,
                                                                                                )
                                                                                            }
                                                                                            success
                                                                                        >
                                                                                            Duyệt
                                                                                        </Button>
                                                                                    )}

                                                                                    <Button
                                                                                        onClick={() =>
                                                                                            handleCancelOrder(item?.id)
                                                                                        }
                                                                                        primary
                                                                                    >
                                                                                        Từ chối
                                                                                    </Button>
                                                                                </div>
                                                                            </>
                                                                        ))}
                                                                </>
                                                            ) : (
                                                                <Link to={'/account/order/order-detail/' + item?.id}>
                                                                    <Button outline>Xem chi tiết</Button>
                                                                </Link>
                                                            )}
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

export default OrderPageAdmin;
