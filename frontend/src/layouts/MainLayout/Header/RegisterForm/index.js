import React, { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { apiRegister } from '~/services/authService';
import Button from '~/components/Button/Button';
import './RegisterForm.scss';
const RegisterForm = ({ setForm }) => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const defaultValidInputs = {
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    };
    const [objectValidInputs, setObjectValidInputs] = useState(defaultValidInputs);

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

        if (!phone) {
            toast.error('Nhập số điện thoại');
            setObjectValidInputs({ ...defaultValidInputs, isValidPhone: false });
            return false;
        }
        /* eslint-disable no-useless-escape */
        let isPhone = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/;

        if (!isPhone.test(phone)) {
            toast.error('Số điện thoại không đúng định dạng');
            setObjectValidInputs({ ...defaultValidInputs, isValidPhone: false });
            return false;
        }

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
                return toast.success(data.EM);
            } else {
                return toast.error(data.EM);
            }
        }
    };
    return (
        <>
            <div className="input mb-1">
                <input
                    type="text"
                    className={objectValidInputs.isValidEmail ? 'form-control' : 'form-control  is-invalid'}
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </div>
            <div className="input mb-1">
                <input
                    type="text"
                    className={objectValidInputs.isValidPhone ? 'form-control' : 'form-control  is-invalid'}
                    placeholder="Số điện thoai"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                />
            </div>
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
                    className={objectValidInputs.isValidConfirmPassword ? 'form-control' : 'form-control  is-invalid'}
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
    );
};

export default RegisterForm;
