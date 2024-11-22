import React, { useEffect, useState } from 'react';
import './EditPasswordPage.scss';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getOneUserApi } from '~/redux/features/userSlice';
import { apiUpdateUser } from '~/services/userService';
import { toast } from 'react-toastify';

const EditPasswordPage = () => {
    const userId = useSelector((state) => state.account.account.userId);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOneUserApi(userId));
    }, [dispatch, userId]);

    const validatePassword = (password) => {
        const lengthValid = password.length >= 8 && password.length <= 32;
        const containsLetter = /[a-zA-Z]/.test(password);
        const containsNumber = /[0-9]/.test(password);
        return lengthValid && containsLetter && containsNumber;
    };

    const handleSave = async () => {
        // Kiểm tra các điều kiện mật khẩu
        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error('Vui lòng nhập đủ thông tin.');
            return;
        }

        if (!validatePassword(newPassword)) {
            toast.error('Mật khẩu mới phải dài từ 8 đến 32 ký tự, bao gồm chữ và số.');
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error('Mật khẩu mới và mật khẩu xác nhận không khớp.');
            return;
        }

        const buildData = {
            id: userId,
            currentPassword: currentPassword,
            newPassword: newPassword,
        };

        const res = await apiUpdateUser(buildData);

        if (res && res.EC === 0) {
            toast.success('Đổi mật khẩu thành công');
        } else {
            toast.error(res.EM);
        }
    };

    return (
        <div className="edit-password-page">
            <div className="title">Đổi mật khẩu</div>
            <div className="content">
                <div className="form">
                    <div className="form-control">
                        <label className="input-label">Mật khẩu hiện tại</label>
                        <div className="w-100 position-relative mb-2">
                            <input
                                name="currentPassword"
                                placeholder="Nhập mật khẩu hiện tại"
                                type={showCurrentPassword ? 'text' : 'password'} // Toggle type
                                className="input"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                            <img
                                src="https://frontend.tikicdn.com/_desktop-next/static/img/account/eye.png"
                                className="icon-right"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)} // Toggle visibility
                                alt="Toggle visibility"
                            />
                        </div>

                        <label className="input-label">Mật khẩu mới</label>
                        <div className="w-100 position-relative">
                            <input
                                name="newPassword"
                                placeholder="Nhập mật khẩu mới"
                                type={showNewPassword ? 'text' : 'password'} // Toggle type
                                className="input"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <img
                                src="https://frontend.tikicdn.com/_desktop-next/static/img/account/eye.png"
                                className="icon-right"
                                onClick={() => setShowNewPassword(!showNewPassword)} // Toggle visibility
                                alt="Toggle visibility"
                            />
                        </div>
                        <div class="hint-message"> Mật khẩu phải dài từ 8 đến 32 ký tự, bao gồm chữ và số</div>

                        <label className="input-label">Nhập lại mật khẩu mới</label>
                        <div className="w-100 position-relative mb-2">
                            <input
                                name="confirmPassword"
                                placeholder="Nhập lại mật khẩu mới"
                                type={showConfirmPassword ? 'text' : 'password'} // Toggle type
                                className="input"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <img
                                src="https://frontend.tikicdn.com/_desktop-next/static/img/account/eye.png"
                                className="icon-right"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle visibility
                                alt="Toggle visibility"
                            />
                        </div>
                    </div>
                    <Button className="w-100 btn" onClick={handleSave}>
                        Lưu thay đổi
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default EditPasswordPage;
