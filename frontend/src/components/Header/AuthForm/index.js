import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from '~/components/Button/Button';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';

import { loginAccount, showLoginForm } from '~/redux/features/accountSlice';
import './AuthForm.scss';

const AuthForm = () => {
    const [valueLogin, setValueLogin] = useState(null);
    const [password, setPassword] = useState(null);

    const { showLogin, auth } = useSelector((state) => state.account);
    const dispatch = useDispatch();

    const handleLogin = async () => {
        const check = await dispatch(loginAccount({ valueLogin, password }));
        if (check) {
            setValueLogin(null);
            setPassword(null);
        }
    };

    useEffect(() => {
        setValueLogin(null)
        setPassword(null)
    },[])
    return (
        <>
            {!auth && <Modal centered show={showLogin} animation={true} onHide={() => dispatch(showLoginForm())}>
                <div className="container-modal-account d-flex">
                    <div className="modal-account-left">
                        <div className="modal-account-left__loginStyled">
                            <div className="heading">
                                <h4>Xin chào,</h4>
                                <p>Đăng nhập tài khoản của bạn</p>
                            </div>
                            <div className="input mb-3">
                                <input
                                    placeholder="Nhập số điện thoại hoặc email"
                                    value={valueLogin}
                                    onChange={(e) => setValueLogin(e.target.value)}
                                />
                            </div>
                            <div className="input">
                                <input
                                    type="password"
                                    placeholder="Nhập password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="btn-continue">
                                <Button primary onClick={handleLogin}>
                                    Đăng nhập
                                </Button>
                            </div>
                            <div className="actions">
                                <p>
                                    Bạn chưa có tài khoản ? <span>Đăng kí</span>{' '}
                                </p>
                            </div>
                        </div>
                    </div>
                                
                    <div className="modal-account-right" onClick={() => dispatch(showLoginForm())}>
                        <div className="icon">
                            <FontAwesomeIcon
                                icon={faX}
                                className="icon-close"
                            />
                        </div>
                        <img src="https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png" />
                    </div>
                </div>
            </Modal>}
        </>
    );
};

export default AuthForm;
