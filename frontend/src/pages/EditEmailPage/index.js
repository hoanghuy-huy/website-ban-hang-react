import React, { useEffect, useState } from 'react';
import './EditEmailPage.scss';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getOneUserApi } from '~/redux/features/userSlice';
import { apiUpdateUser } from '~/services/userService';
import { toast } from 'react-toastify';

const EditEmailPage = () => {
    const infoUser = useSelector((state) => state.user.infoUser);
    const userId = useSelector((state) => state.account.account.userId);
    const [email, setEmail] = useState(infoUser?.email); // Thay đổi từ phone thành email
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOneUserApi(userId));
    }, [dispatch, userId]);

    const handleSave = async () => {
        // Kiểm tra định dạng email
        const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Địa chỉ email không hợp lệ. Vui lòng nhập lại.');
            return;
        }

        if(infoUser.email === email) {
            toast.success('Không có gì thay đổi')
            return
        }
        const buildData = {
            id: userId,
            email: email, // Cập nhật email thay vì phone
        };

    
        const res = await apiUpdateUser(buildData);

        if (res && res.EC === 0) {
            await dispatch(getOneUserApi(userId));
            toast.success('Sửa thông tin thành công');
        } else {
            toast.error(res.EM);
        }
    };

    return (
        <div className="edit-email-page">
            <div className="title">Cập nhật Email</div>
            <div className="content">
                <div className="form">
                    <div className="form-control">
                        <label className="input-label">Địa chỉ email</label>
                        <div>
                            <div className="w-100 position-relative">
                                <img
                                    src="https://frontend.tikicdn.com/_desktop-next/static/img/account/email.png" // Sử dụng biểu tượng email
                                    className="icon-left"
                                    alt=""
                                />
                                <input
                                    name="email"
                                    maxLength="100" // Giới hạn độ dài cho email
                                    placeholder="Nhập địa chỉ email"
                                    type="email" // Thay đổi type thành email
                                    className="input with-icon-left"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <Button className="w-100 btn" onClick={handleSave}>
                                Lưu thay đổi
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditEmailPage;