import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { apiRegister } from '~/services/authService';
import { useNavigate } from 'react-router-dom';
import './Register.scss';

const Register = () => {

    useEffect(() => {}, []);
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const defaultValidInputs ={
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    };
    const [objectValidInputs, setObjectValidInputs] = useState(
        defaultValidInputs
    );

    const isValidInputs = () => {
        setObjectValidInputs(defaultValidInputs);

        if (!email) {
            toast.error('Email is required');
            setObjectValidInputs({ ...defaultValidInputs, isValidEmail: false });
            return false;
        }

        let re = /\S+@\S+\.\S+/; /* eslint-disable no-useless-escape */

        if (!re.test(email)) {
            toast.error('Please enter a valid email');
            setObjectValidInputs({ ...defaultValidInputs, isValidEmail: false });
            return false;
        }

        if (!phone) {
            toast.error('Phone is required');
            setObjectValidInputs({ ...defaultValidInputs, isValidPhone: false });
            return false;
        }
        /* eslint-disable no-useless-escape */
        let isPhone = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/;

        if (!isPhone.test(phone)) {
            toast.error('Please enter a valid phone');
            setObjectValidInputs({ ...defaultValidInputs, isValidPhone: false });
            return false;
        }

        if (!password) {
            toast.error('Password is required');
            setObjectValidInputs({ ...defaultValidInputs, isValidPassword: false });
            return false;
        }

        if (password !== confirmPassword) {
            toast.error('Password is not same');
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
                navigate('/login')
                return toast.success(data.EM)
            } else {
                return toast.error(data.EM);
            }
        }
    };

    return (
        <div className="register-container bg-light d-flex align-items-center">
            <div className="container ">
                <div className="row px-3">
                    <div className="content-left col-12 d-none col-sm-5 col-md-8 d-sm-block ">
                        <div className="brand">
                            <h1>Hoang Huy Shop</h1>
                        </div>
                        <h3>Welcome to my shope let choose every thing you want</h3>
                    </div>
                    <div className="content-right col-sm-7 col-md-4 col-12 d-flex flex-column gap-3 px-5">
                        <div className="header-form-register py-3">
                            <h3> Register </h3>
                        </div>
                        <div className="input">
                            <input
                                type="text"
                                className={objectValidInputs.isValidEmail ? 'form-control' : 'form-control  is-invalid'}
                                placeholder="Email address"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="input">
                            <input
                                type="text"
                                className={objectValidInputs.isValidPhone ? 'form-control' : 'form-control  is-invalid'}
                                placeholder="Phone number"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>
                        <div className="input">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="input">
                            <input
                                placeholder="Password"
                                type="password"
                                className={
                                    objectValidInputs.isValidPassword ? 'form-control' : 'form-control  is-invalid'
                                }
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="input">
                            <input
                                placeholder="Re-enter password"
                                type="password"
                                className={
                                    objectValidInputs.isValidConfirmPassword
                                        ? 'form-control'
                                        : 'form-control  is-invalid'
                                }
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                        </div>

                        <button className="btn btn-primary" onClick={handleRegister}>
                            Register
                        </button>
                        <span>
                            <a href="/">Forgot password</a>
                        </span>
                        <hr />
                        <div className="d-flex flex-sm-row flex-column justify-content-center gap-3 mb-3">
                            <button className="col-sm-4 btn btn-light border border-secondary">Facebook</button>
                            <button className="col-sm-4 btn btn-light border border-secondary">
                                <span>Google</span>
                            </button>
                        </div>
                        <div className="d-flex justify-content-center">
                            <span>You're already have account ? </span>
                            <div style={{ color: 'blue', cursor: 'pointer' }}> Login </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
