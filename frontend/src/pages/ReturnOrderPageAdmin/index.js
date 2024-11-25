import React, { useEffect, useState } from 'react';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import Button from '~/components/Button/Button';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import DoDisturbAltOutlinedIcon from '@mui/icons-material/DoDisturbAltOutlined';
import './ReturnOrderPageAdmin.scss';
import { useDispatch, useSelector } from 'react-redux';
import { convertPrice } from '~/utils/convert';
import { Link } from 'react-router-dom';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import AssignmentReturnOutlinedIcon from '@mui/icons-material/AssignmentReturnOutlined';
import { approveReturnedOrderByAdmin, getListOrderToReturnAdmin } from '~/redux/features/orderSlice';

const ReturnOrderPageAdmin = () => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState(null);
    const listOrderToReturnAdmin = useSelector((state) => state.order.listOrderToReturnAdmin);
    const { userId } = useSelector((state) => state.account.account);
    useEffect(() => {
        dispatch(getListOrderToReturnAdmin({ userId }));
        setAction('0');
    }, []);

    useEffect(() => {
        dispatch(getListOrderToReturnAdmin({ statusReturn: action }));
    }, [dispatch, userId, action]);

    const handleFetchData = (value) => {
        setAction(value);
    };

    const handleAdminConfirmReturnOrder = async (orderDetailId) => {
        await dispatch(approveReturnedOrderByAdmin({ orderDetailId: orderDetailId }));
        await dispatch(getListOrderToReturnAdmin({ statusReturn: action }));
    };
    console.log(listOrderToReturnAdmin)
    return (
        <div className="ReturnOrderPageAdmin">
            <div className="ReturnOrderPageAdmin-container">
                <div className="heading mb-4">
                    <h5 className="title">Quản lý trả hàng</h5>
                </div>
                <div className="content w-100">
                    <div className="StyledTab mb-4">
                        <div
                            className={action === '0' ? 'StyledTab-item active col-6' : 'StyledTab-item col-6'}
                            onClick={() => handleFetchData('0')}
                        >
                            Đang đợi duyệt
                        </div>

                        <div
                            className={action === '1' ? 'StyledTab-item active col-6' : 'StyledTab-item col-6'}
                            onClick={() => handleFetchData('1')}
                        >
                            Trả hàng thành công
                        </div>
                    </div>
                    <div className="StyledOrder">
                        <div className="StyledOrder-container">
                            {listOrderToReturnAdmin && listOrderToReturnAdmin.length > 0 ? (
                                listOrderToReturnAdmin.map((item) => {
                                    return (
                                        <>
                                            <div className="OrderItem">
                                                <div className="heading">
                                                    <div className="title">
                                                        {item.status === true && item.statusReturn === null && (
                                                            <>
                                                                <CheckOutlinedIcon />
                                                                Sản phẩm đã giao thành công
                                                            </>
                                                        )}

                                                        {item.statusReturn === false && (
                                                            <>
                                                                <HourglassEmptyOutlinedIcon />
                                                                Đang đợi duyệt
                                                            </>
                                                        )}

                                                        {item.statusReturn === true && (
                                                            <>
                                                                <CheckOutlinedIcon />
                                                                Đã duyệt
                                                            </>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="ProductItems">
                                                    <div className="ProductItem">
                                                        <div className="product-info">
                                                            <div className="img">
                                                                <img src={item?.Product?.thumbnailUrl} />
                                                                <div className="quantity">x{item?.returnItem}</div>
                                                            </div>
                                                            <div className="name">{item?.Product?.name}</div>
                                                        </div>
                                                        <div className="price">{convertPrice(item?.price)} ₫</div>
                                                    </div>
                                                </div>

                                                <div className="FooterAction">
                                                    <div className="FooterAction-container">
                                                        {/* <div className="total-price">
                                                            <span>Tổng tiền: </span>
                                                            {convertPrice(item?.totalPrice)} ₫
                                                        </div> */}
                                                        <div className="reason-return-order">
                                                            Lý do :{' '}
                                                            {item && item.contentReturn
                                                                ? item.contentReturn
                                                                : 'không có lý do'}
                                                        </div>
                                                        {item.status === true && item.statusReturn == 0 && (
                                                            <div className="actions mt-2 mx-2 d-flex gap-2">
                                                                <Button
                                                                    size="small"
                                                                    outline
                                                                    color="success"
                                                                    onClick={() =>
                                                                        handleAdminConfirmReturnOrder(item.id)
                                                                    }
                                                                >
                                                                    Duyệt
                                                                </Button>
                                                            </div>
                                                        )}
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

export default ReturnOrderPageAdmin;
