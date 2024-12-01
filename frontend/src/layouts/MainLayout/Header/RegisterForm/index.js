import React, { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { apiRegister } from '~/services/authService';
import Button from '~/components/Button/Button';
import './RegisterForm.scss';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import BackdropComp from '~/components/BackDropComp';
const RegisterForm = ({ setForm }) => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState(1);
    const [otp, setOTP] = useState('');
    const [loading, setLoading] = useState(false);
    const defaultValidInputs = {
        isValidEmail: true,
        // isValidPhone: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    };
    const [objectValidInputs, setObjectValidInputs] = useState(defaultValidInputs);
    const dispatch = useDispatch();
    const isValidInputs = () => {
        setObjectValidInputs(defaultValidInputs);

        if (!email) {
            toast.error('Vui lòng nhập email');
            setObjectValidInputs({ ...defaultValidInputs, isValidEmail: false });
            return false;
        }

        let re = /\S+@\S+\.\S+/; /* eslint-disable no-useless-escape */

        if (!re.test(email)) {
            toast.error('Email không đúng định dạng');
            setObjectValidInputs({ ...defaultValidInputs, isValidEmail: false });
            return false;
        }

        // if (!phone) {
        //     toast.error('Nhập số điện thoại');
        //     setObjectValidInputs({ ...defaultValidInputs, isValidPhone: false });
        //     return false;
        // }
        /* eslint-disable no-useless-escape */
        let isPhone = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/;

        // if (!isPhone.test(phone)) {
        //     toast.error('Số điện thoại không đúng định dạng');
        //     setObjectValidInputs({ ...defaultValidInputs, isValidPhone: false });
        //     return false;
        // }

        if (!password) {
            toast.error('Vui lòng nhập Password');
            setObjectValidInputs({ ...defaultValidInputs, isValidPassword: false });
            return false;
        }

        if (password !== confirmPassword) {
            toast.error('Password không trùng khớp');
            setObjectValidInputs({
                ...defaultValidInputs,
                isValidPassword: false,
                isValidConfirmPassword: false,
            });
            return false;
        }

        return true;
    };

    const handleRegister = async () => {
        let check = isValidInputs();
        if (check === true) {
            const data = await apiRegister(email, phone, username, password);
            if (data.EC === 0) {
                setForm(null);
                return toast.success(data.EM);
            } else {
                return toast.error(data.EM);
            }
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
        <>
            {step === 3 && (
                <>
                    {/* <div className="input mb-1">
                        <input
                            type="text"
                            className={objectValidInputs.isValidPhone ? 'form-control' : 'form-control  is-invalid'}
                            placeholder="Số điện thoai"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                        />
                    </div> */}
                    <div className="input mb-1">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>
                    <div className="input mb-1">
                        <input
                            placeholder="Password"
                            type="password"
                            className={objectValidInputs.isValidPassword ? 'form-control' : 'form-control  is-invalid'}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div className="input mb-1">
                        <input
                            placeholder="Nhập lại password"
                            type="password"
                            className={
                                objectValidInputs.isValidConfirmPassword ? 'form-control' : 'form-control  is-invalid'
                            }
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                        />
                    </div>
                    <div className="btn-continue">
                        <Button success onClick={handleRegister}>
                            Đăng ký
                        </Button>
                    </div>
                </>
            )}
            {step === 1 && (
                <>
                    <div className="input mb-1">
                        <input
                            type="text"
                            className={objectValidInputs.isValidEmail ? 'form-control' : 'form-control  is-invalid'}
                            placeholder="Vui lòng nhập Email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="btn-continue">
                        <Button normal onClick={() => handleSendOTP(email)}>
                            Nhận mã xác thực
                        </Button>
                    </div>
                </>
            )}
            {step === 2 && (
                <>
                    <div className="input mb-1">
                        <input
                            type="text"
                            className={'form-control'}
                            placeholder="Vui lòng nhập OTP"
                            value={otp}
                            onChange={(event) => setOTP(event.target.value)}
                        />
                    </div>
                    <div className="btn-continue">
                        <Button primary onClick={() => handleVerifyOTP(email, otp)}>
                            Xác thực
                        </Button>
                    </div>
                </>
            )}
            <BackdropComp loading={loading} />
        </>
    );
};

export default RegisterForm;
