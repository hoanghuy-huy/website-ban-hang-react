import React from 'react';
import './EditPhonePage.scss';
import { Button } from '@mui/material';
const EditPhonePage = () => {
    return (
        <div className="edit-phone-page">
            <div className="title">Cập nhật số điện thoại</div>
            <div className="content">
                <div className="form">
                    <div className="form-control">
                        <label className="input-label">Số điện thoại</label>
                        <div>
                            <div class="w-100 position-relative">
                                <img
                                    src="https://frontend.tikicdn.com/_desktop-next/static/img/account/phone.png"
                                    class="icon-left"
                                    alt=""
                                />
                                <input
                                    name="phone"
                                    maxlength="10"
                                    placeholder="Nhập số điện thoại"
                                    type="search"
                                    class="input with-icon-left"
                                    value=""
                                    error=""
                                />
                            </div>
                            <div class="hint-message">
                                Mã xác thực (OTP) sẽ được gửi đến số điện thoại này để xác minh số điện thoại là của bạn
                            </div>
                            <Button className="w-100 btn">Lưu thay đổi</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPhonePage;
