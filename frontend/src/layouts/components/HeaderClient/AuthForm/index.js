import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from '~/components/Button/Button';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';

import { showLoginForm } from '~/redux/features/accountSlice';
import './AuthForm.scss';

const AuthForm = () => {
    const showForm = useSelector((state) => state.account.showLogin)
    const dispatch = useDispatch()
    
    return (
        <Modal centered show={showForm} animation={true} onHide={() => dispatch(showLoginForm())}>
            <div className="container-modal-account d-flex">
                <div className="modal-account-left">
                    <div className="modal-account-left__loginStyled">
                        <div className="heading">
                            <h4>Xin chào,</h4>
                            <p>Đăng nhập tài khoản của bạn</p>
                        </div>
                        <form>
                            <div className="input mb-3">
                                <input placeholder="Nhập số điện thoại hoặc email" />
                            </div>
                            <div className="input">
                                <input type="password" placeholder="Nhập password" />
                            </div>
                            <div className="btn-continue">
                                <Button primary>Tiếp tục</Button>
                            </div>
                        </form>
                        <div className="actions">
                            <p>
                                Bạn chưa có tài khoản ? <span>Đăng kí</span>{' '}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="modal-account-right">
                    <div className="icon">
                        <FontAwesomeIcon icon={faX} className="icon-close" onClick={() => dispatch(showLoginForm())}/>
                    </div>
                    <img src="https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png" />
                </div>
            </div>
        </Modal>
    );
};

export default AuthForm;
