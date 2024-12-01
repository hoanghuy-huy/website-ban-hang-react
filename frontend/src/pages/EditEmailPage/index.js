import React, { useEffect, useState } from 'react';
import './EditEmailPage.scss';
import { Backdrop, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getOneUserApi } from '~/redux/features/userSlice';
import { apiUpdateUser } from '~/services/userService';
import { toast } from 'react-toastify';
import axios from 'axios';
import BackdropComp from '~/components/BackDropComp';

const EditEmailPage = () => {
    const infoUser = useSelector((state) => state.user.infoUser);
    const userId = useSelector((state) => state.account.account.userId);
    const [email, setEmail] = useState(infoUser?.email); // Thay đổi từ phone thành email
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1);
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

        if (infoUser.email === email) {
            toast.success('Không có gì thay đổi');
            return;
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
    const handleSendOTP = async (email) => {
        setLoading(true);
        const response = await axios.post('http://localhost:3000/api/v1/send-otp', { email });
        const res = response.data || [];
        if (res && res.EC === 0) {
            if (res.DT && res.DT.EC === 0) {
                toast.success(res.DT.EM);
                setStep(2);
                setLoading(false);
            } else {
                toast.error(res.DT.EM);
                setLoading(false);
            }
        } else {
            console.log(res);
            setLoading(false);

            toast.error('Xảy ra lỗi vui lòng thử lại');
        }
    };

    const handleVerifyOTP = async (email, otp) => {
        setLoading(true);
        const response = await axios.post('http://localhost:3000/api/v1/verify-otp', { email, otp });
        const res = response.data || [];
        if (res && res.EC === 0) {
            if (res.DT && res.DT.EC === 0) {
                toast.success(res.DT.EM);

                setLoading(false);
                setStep(3);
            } else {
                toast.error(res.DT.EM);
                setLoading(false);
            }
        } else {
            console.log(res);
            setLoading(false);

            toast.error('Xảy ra lỗi vui lòng thử lại');
        }
    };
    return (
        <div className="edit-email-page">
            <div className="title">Cập nhật Email</div>
            <div className="content">
                <div className="form">
                    <div className="form-control">
                        <>
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
                        </>
                    </div>
                </div>
            </div>
            <BackdropComp loading={loading} />
        </div>
    );
};

export default EditEmailPage;
