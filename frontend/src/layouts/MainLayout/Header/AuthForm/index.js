import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Button from '~/components/Button/Button';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';

import { loginAccount, registerApi, showLoginForm } from '~/redux/features/accountSlice';
import { toast } from 'react-toastify';
import RegisterForm from '../RegisterForm';
import './AuthForm.scss';

const AuthForm = () => {
    const REGISTER_FORM = 'register';

    const [valueLogin, setValueLogin] = useState('');
    const [password, setPassword] = useState('');
    const [form, setForm] = useState(null);
    const { showLogin, auth } = useSelector((state) => state.account);
    const dispatch = useDispatch();

    const handleLogin = async () => {
        if (valueLogin === '' || password === '') {
            toast.error('Vui lòng không để trống');
            return;
        }

        await dispatch(loginAccount({ valueLogin, password }));
       
    };

    const handleRegister = async () => {
        if (valueLogin === '' || password === '') {
            toast.error('Vui lòng không để trống');
            return;
        }
        await dispatch(registerApi({ email: valueLogin, password: password }));
    };

    useEffect(() => {
        setValueLogin('');
        setPassword('');
        setForm(null);
    }, []);

    useEffect(() => {
        setValueLogin('');
        setPassword('');
        setForm(null);
    }, [showLogin]);

    return (
        <>
            {!auth && (
                <Modal centered show={showLogin} animation={true} >
                    <div className="container-modal-account d-flex">
                        <div className="modal-account-left">
                            <div className="modal-account-left__loginStyled">
                                <div className="heading">
                                    <h4>Xin chào,</h4>
                                    {form === REGISTER_FORM ? (
                                        <p>Đăng ký tài khoản của bạn</p>
                                    ) : (
                                        <p>Đăng nhập tài khoản của bạn</p>
                                    )}
                                </div>
                                {form === REGISTER_FORM ? (
                                    <RegisterForm  setForm={setForm}/>
                                ) : (
                                    <>
                                        <div className="input mb-3">
                                            <input
                                                placeholder="Nhập email của bạn"
                                                value={valueLogin}
                                                onChange={(e) => setValueLogin(e.target.value)}
                                            />
                                        </div>
                                        <div className="input">
                                            <input
                                                type="password"
                                                placeholder="Nhập password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                        <div className="btn-continue">
                                            <Button primary onClick={handleLogin}>
                                                Đăng nhập
                                            </Button>
                                        </div>
                                    </>
                                )}

                                <div className="actions">
                                    {form !== REGISTER_FORM ? (
                                        <p>
                                            Bạn chưa có tài khoản ?{' '}
                                            <span onClick={() => setForm(REGISTER_FORM)}> Đăng kí</span>{' '}
                                        </p>
                                    ) : (
                                        <p>
                                            Bạn đã có tài khoản ? <span onClick={() => setForm(null)}> Đăng nhập</span>{' '}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="modal-account-right" onClick={() => dispatch(showLoginForm())}>
                            <div className="icon">
                                <FontAwesomeIcon icon={faX} className="icon-close" />
                            </div>
                            <img src="https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png" />
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default AuthForm;
