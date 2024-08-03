import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './AccountAction.scss';
import Button from '~/components/Button/Button';
import { faX } from '@fortawesome/free-solid-svg-icons';

const AccountActions = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="action-user text-center">
            <div onClick={handleShow}>
                <FontAwesomeIcon className="icon user pe-1" icon={faUser} />
                <span title="account" className="d-none d-xxl-inline">
                    Account
                </span>
            </div>

            <Modal centered show={show} onHide={handleClose} animation={false}>
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
                        <div className='icon' onClick={handleClose}>
                            <FontAwesomeIcon icon={faX} className="icon-close" />
                        </div>
                        <img src="https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png" />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AccountActions;
