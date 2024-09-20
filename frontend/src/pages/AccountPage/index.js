import React from 'react';
import './AccountPage.scss';
const AccountPage = () => {
    return (
        <main>
            <div className="AccountPage">
                <div className="AccountPage-container">
                    <aside className="AccountPage__sidebar"></aside>
                    <div className="AccountPage__content-inner">
                        <div className="AccountOrderDetail">
                            <div className="heading">
                                <span>Chi tiết đơn hàng #244802470</span>
                                <span class="split">-</span>
                                <span class="status">Đang xử lý</span>
                            </div>
                            <div className="StyleGroupSection d-flex">
                                <div className="StyleSection col-4">
                                    <div className="title">Địa chỉ người nhận</div>
                                    <div className="content">
                                        <p class="name">Hoang Huy</p>
                                        <p class="address">
                                            <span>Địa chỉ: </span>
                                            Hoang Huyv dsfasfa afaf Hoang Huyv dsfasfa afaf Hoang Huyv dsfasfa afaf
                                        </p>
                                        <p class="phone">
                                            <span>Điện thoại: </span>
                                            012341240
                                        </p>
                                    </div>
                                </div>
                                <div className="StyleSection col-4">
                                    <div className="title">Hình thức giao hàng</div>
                                    <div className="content">
                                        <p>
                                            <span> Giao Tiết Kiệm</span>
                                        </p>
                                        <p>Giao thứ 2, trước 19h, 23/09</p>
                                        <p>Được giao bởi TikiNOW Smart Logistics (giao từ Hồ Chí Minh)</p>
                                        <p>Phí vận chuyển: 13.700đ</p>
                                    </div>
                                </div>
                                <div className="StyleSection col-4">
                                    <div className="title">Hình thức thanh toán</div>
                                    <div className="content">
                                        <div class="content">
                                            <p>Thanh toán tiền mặt khi nhận hàng</p>
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
                                    <tr>
                                        <td>
                                            <div className="product-item d-flex">
                                                <div className="product-item-img">
                                                    <img src="https://salt.tikicdn.com/cache/200x200/ts/product/e7/6c/30/fdddfe8cc9bfadbe556f0c1b45d0b18f.png" />
                                                </div>
                                                <div className="product-info">
                                                    <div className="product-name">
                                                        {' '}
                                                        Tai Nghe Điện Thoại PKCB323 Thoại Cổng 3.5mm - Hàng Chính Hãng
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="price">90.000 ₫</td>
                                        <td class="quantity">90.000 ₫</td>
                                        <td class="discount-amount">90.000 ₫</td>
                                        <td class="total">90.000 ₫</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="4">
                                            <span>Tạm tính</span>
                                        </td>
                                        <td>90.000 ₫</td>
                                    </tr>
                                    <tr>
                                        <td colspan="4">
                                            <span>Phí vận chuyển</span>
                                        </td>
                                        <td>28.700 ₫</td>
                                    </tr>
                                    <tr>
                                        <td colspan="4">
                                            <span>Khuyến mãi vận chuyển</span>
                                        </td>
                                        <td>-15.000 ₫</td>
                                    </tr>
                                    <tr>
                                        <td colspan="4">
                                            <span>Tổng cộng</span>
                                        </td>
                                        <td>
                                            <span class="sum">103.700 ₫</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="4"></td>
                                        <td>
                                            <a title="Hủy đơn hàng" class="cancel-order">
                                                Hủy đơn hàng
                                            </a>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AccountPage;
