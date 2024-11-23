import React, { useEffect, useState } from 'react';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import Button from '~/components/Button/Button';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import DoDisturbAltOutlinedIcon from '@mui/icons-material/DoDisturbAltOutlined';
import './ReturnOrderPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
    customerConfirmOrderApi,
    customerReturnOrderApi,
    getAllOrderDeliveryWithUserIdApi,
    getAllOrderWithUserIdApi,
    getAllStatusOrderWithUserIdApi,
    handleChoseActionToFetchApiOrder,
} from '~/redux/features/orderSlice';
import { convertPrice } from '~/utils/convert';
import { Link } from 'react-router-dom';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import AssignmentReturnOutlinedIcon from '@mui/icons-material/AssignmentReturnOutlined';
import {
    FETCH_ALL_ORDER,
    FETCH_ALL_ORDER_DELIVERY,
    FETCH_ALL_ORDER_PENDING,
    FETCH_STATUS_CANCEL_ORDER,
    FETCH_STATUS_ORDER,
    FETCH_STATUS_RETURN_ORDER,
    FETCH_STATUS_SUCCESS_ORDER,
} from '~/utils/constants';
import PaginationComponent from '~/components/Pagination';
const ReturnOrderPage = () => {
    const dispatch = useDispatch();
    const { orderList, actionFetchApi } = useSelector((state) => state.order);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(3);
    const { userId } = useSelector((state) => state.account.account);
    const { totalPages, totalItems, orders } = orderList;
    useEffect(() => {

    }, []);

    useEffect(() => {
       
    }, [actionFetchApi, currentPage]);

    const handleSelectActionToFetchApi = (type) => {
    };

    const handleCustomerConfirmOrder = async (orderId) => {

    };

    return (
        <div className="ReturnOrderPage">
            <div className="ReturnOrderPage-container">
                <div className="heading mb-4">
                    <h5 className="title">Quản lý trả hàng</h5>
                </div>
                <div className="content">
                    <div className="StyledTab mb-4 ">
                        <div
                            className={
                                actionFetchApi.type === FETCH_ALL_ORDER
                                    ? 'StyledTab-item active col-4'
                                    : 'StyledTab-item col-4'
                            }
                            onClick={() => handleSelectActionToFetchApi({ type: FETCH_ALL_ORDER })}
                        >
                            Tất cả đơn hàng
                        </div>
                        <div
                            className={
                                actionFetchApi.type === FETCH_ALL_ORDER_PENDING
                                    ? 'StyledTab-item active col-4'
                                    : 'StyledTab-item col-4'
                            }
                            onClick={() => handleSelectActionToFetchApi({ type: FETCH_ALL_ORDER_PENDING })}
                        >
                            Đang đợi duyệt
                        </div>

                        <div
                            className={
                                actionFetchApi.type === FETCH_STATUS_SUCCESS_ORDER
                                    ? 'StyledTab-item active col-4'
                                    : 'StyledTab-item col-4'
                            }
                            onClick={() => handleSelectActionToFetchApi({ type: FETCH_STATUS_SUCCESS_ORDER })}
                        >
                            Trả hàng thành công
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
                                                                            item.statusReturnProduct !== null ? (
                                                                                <>
                                                                                    <AssignmentReturnOutlinedIcon />
                                                                                    Trả hàng
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <LocalShippingOutlinedIcon />
                                                                                    Giao thành Công
                                                                                </>
                                                                            )
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

                                                        <div className="actions mt-2 mx-2 d-flex gap-2">
                                                            <Link to={'/account/order/order-detail/' + item?.id}>
                                                                <Button size="small" outline>
                                                                    Xem chi tiết
                                                                </Button>
                                                            </Link>
                                                            {item.orderStatusDelivery === 1 &&
                                                                item.orderStatus === null &&
                                                                item.status === 1 && (
                                                                    <Link className="success-btn">
                                                                        <Button
                                                                            size="small"
                                                                            outline
                                                                            onClick={() =>
                                                                                handleCustomerConfirmOrder(item.id)
                                                                            }
                                                                        >
                                                                            Đã nhận được hàng
                                                                        </Button>
                                                                    </Link>
                                                                )}

                                                            {/* <Link className="success-btn">
                                                                <Button
                                                                    size="small"
                                                                    outline
                                                                    onClick={() => handleCustomerConfirmOrder(item.id)}
                                                                >
                                                                    Đánh giá sản phẩm
                                                                </Button>
                                                            </Link> */}
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
            {totalPages && totalPages > 1 ? (
                <div className="d-flex justify-content-center">
                    <PaginationComponent
                        page={currentPage}
                        totalPages={totalPages}
                        limit={limit}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default ReturnOrderPage;
