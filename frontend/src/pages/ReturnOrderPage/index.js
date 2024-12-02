import React, { useEffect, useState } from 'react';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import Button from '~/components/Button/Button';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import DoDisturbAltOutlinedIcon from '@mui/icons-material/DoDisturbAltOutlined';
import './ReturnOrderPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { convertPrice } from '~/utils/convert';
import { Link } from 'react-router-dom';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import AssignmentReturnOutlinedIcon from '@mui/icons-material/AssignmentReturnOutlined';
import { getListOrderToReturn } from '~/redux/features/orderSlice';
import ModalReturnProduct from './ModalReturnProduct';
const ReturnOrderPage = () => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState(null);
    const [data, setData] = useState('');
    const listOrderToReturn = useSelector((state) => state.order.listOrderToReturn);
    const { userId } = useSelector((state) => state.account.account);
    useEffect(() => {
        dispatch(getListOrderToReturn({ userId }));
        setAction(null);
    }, []);

    useEffect(() => {
        dispatch(getListOrderToReturn({ userId, statusReturn: action }));
    }, [dispatch, userId, action]);

    const handleFetchData = (value) => {
        setAction(value);
    };

    const handleReturnOrder = (item) => {
        setData(item);
        setShowModal(true);
    };

    return (
        <div className="ReturnOrderPage w-100">
            <div className="ReturnOrderPage-container">
                <div className="heading mb-4">
                    <h5 className="title">Quản lý trả hàng</h5>
                </div>
                <div className="content">
                    <div className="StyledTab mb-4 ">
                        <div
                            className={action === null ? 'StyledTab-item active col-4' : 'StyledTab-item col-4'}
                            onClick={() => handleFetchData(null)}
                        >
                            Tất cả đơn hàng
                        </div>
                        <div
                            className={action === '0' ? 'StyledTab-item active col-4' : 'StyledTab-item col-4'}
                            onClick={() => handleFetchData('0')}
                        >
                            Đang đợi duyệt
                        </div>

                        <div
                            className={action === '1' ? 'StyledTab-item active col-4' : 'StyledTab-item col-4'}
                            onClick={() => handleFetchData('1')}
                        >
                            Trả hàng thành công
                        </div>
                    </div>
                    <div className="StyledOrder">
                        <div className="StyledOrder-container">
                            {listOrderToReturn && listOrderToReturn.length > 0 ? (
                                listOrderToReturn.map((item) => {
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
                                                                <CheckOutlinedIcon />
                                                                Đang đợi duyệt
                                                            </>
                                                        )}

                                                        {item.statusReturn === true && (
                                                            <>
                                                                <CheckOutlinedIcon />
                                                                Yêu cầu trả hàng thành công
                                                            </>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="ProductItems">
                                                    <div className="ProductItem">
                                                        <div className="product-info">
                                                            <div className="img">
                                                                <img src={item?.Product?.thumbnailUrl} />
                                                                {action === null ? (
                                                                    <div className="quantity">x{item.quantity}</div>
                                                                ) : (
                                                                    <div className="quantity">x{item.returnItem}</div>
                                                                )}
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
                                                        {item.status === true && item.statusReturn == null && (
                                                            <div className="actions mt-2 mx-2 d-flex gap-2">
                                                                <Button
                                                                    size="small"
                                                                    outline
                                                                    onClick={() => handleReturnOrder(item)}
                                                                >
                                                                    Trả hàng
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

            <ModalReturnProduct data={data} show={showModal} setShow={setShowModal} userId={userId} />
        </div>
    );
};

export default ReturnOrderPage;
