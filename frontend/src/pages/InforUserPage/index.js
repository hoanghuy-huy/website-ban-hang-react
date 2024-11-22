import React, { useEffect, useState } from 'react';
import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faX } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button/Button';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import './InfoUserPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { apiGetOneUser, apiUpdateUser } from '~/services/userService';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { getOneUserApi } from '~/redux/features/userSlice';
const InfoUserPage = () => {
    const [dataUser, setDataUser] = useState([]);
    const infoUser = useSelector((state) => state.user.infoUser);
    const userId = useSelector((state) => state.account.account.userId);
    const [message, setMessage] = useState(false);
    const [messageError, setMessageError] = useState(false);

    const dispatch = useDispatch();

    const validateFullname = (value) => {
        const nameParts = value.trim().split(' ');
        if (nameParts.length < 2) {
            setMessage(true);
        } else {
            setMessageError(false);
            setMessage(false);
        }
    };

    const handleOnchangeValueUser = (key, value) => {
        const _data = _.cloneDeep(dataUser);
        _data[key] = value;
        setDataUser(_data);

        if (key === 'fullname') {
            validateFullname(value);
        }
    };
    const handleClearInput = (key) => {
        const _data = _.cloneDeep(dataUser);
        _data[key] = '';
        setDataUser(_data);
    };

    const fetchData = async () => {
        const res = await apiGetOneUser(userId);
        if (res && res.EC === 0) {
            setDataUser(res.DT);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmitFormInfoUser = async () => {
        if (message) {
            setMessageError(true);
            return;
        }

        const _data = _.cloneDeep(dataUser);
        const buildData = {
            id: userId,
            fullname: _data.fullname,
            username: _data.username,
            gender: _data.gender,
        };

        const res = await apiUpdateUser(buildData);

        if (res && res.EC === 0) {
            await getOneUserApi(userId);
            toast.success('Sửa thông tin thành công');
        } else {
            toast.error('Xảy ra lỗi vui lòng thử lại');
        }
    };

    return (
        <div className="info-user-page">
            <div className="information-account-user col-12 mx-3 d-flex flex-column">
                <div className="row">
                    <div className="info-left col-7">
                        <div
                            className="info-title pt-3"
                            style={{ fontSize: 16, lineHeight: '24px', fontWeight: 500, color: 'rgb(100, 100, 109)' }}
                        >
                            Thông tin cá nhân
                        </div>
                        <div className="form-info" style={{ marginTop: 16, display: 'flex' }}>
                            {/* <div className="form-avatar">
                                <Image
                                    style={{ height: 104, width: 104, borderRadius: '50%' }}
                                    src="https://salt.tikicdn.com/cache/512x512/ts/avatar/db/40/84/abb45028401bfb8e035f36b41ac2da0e.jpg"
                                />
                            </div> */}
                            <div className="form-name ms-3">
                                <div
                                    className="name"
                                    style={{
                                        display: 'flex',
                                        position: 'relative',
                                        marginBottom: 34,
                                        alignItems: 'center',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 110,
                                            minWidth: 110,
                                            fontSize: '14px',
                                            color: 'rbg(51, 51, 51)',
                                        }}
                                    >
                                        Họ & Tên
                                    </div>
                                    <input
                                        placeholder="Thêm họ và tên"
                                        maxLength={128}
                                        value={dataUser?.fullname}
                                        onChange={(e) => handleOnchangeValueUser('fullname', e.target.value)}
                                        style={{
                                            width: '100%',
                                            height: 36,
                                            border: '1px solid rgb(196, 196, 207)',
                                            lineHeight: '20px',
                                            padding: '10px 12px',
                                            borderRadius: 4,
                                            outline: 'none',
                                        }}
                                        className={messageError ? 'input-error' : ''}
                                    />
                                    {dataUser && dataUser.fullname !== '' && dataUser.fullname !== null && (
                                        <FontAwesomeIcon
                                            icon={faX}
                                            onClick={() => handleClearInput('fullname')}
                                            style={{
                                                position: 'absolute',
                                                right: 9,
                                                fontSize: 12,
                                                color: 'var(--primary-color)',
                                                cursor: 'pointer',
                                            }}
                                        />
                                    )}
                                    {message && (
                                        <div class={messageError ? 'message error' : 'message'}>
                                            Họ &amp; Tên gồm 2 từ trở lên
                                        </div>
                                    )}
                                </div>
                                <div
                                    className="username"
                                    style={{
                                        display: 'flex',
                                        position: 'relative',
                                        marginBottom: 34,
                                        alignItems: 'center',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 110,
                                            minWidth: 110,
                                            fontSize: '14px',
                                            color: 'rbg(51, 51, 51)',
                                        }}
                                    >
                                        username
                                    </div>
                                    <input
                                        placeholder="Nhập username của bạn"
                                        maxLength={128}
                                        value={dataUser?.username}
                                        onChange={(e) => handleOnchangeValueUser('username', e.target.value)}
                                        style={{
                                            width: '100%',
                                            height: 36,
                                            border: '1px solid rgb(196, 196, 207)',
                                            lineHeight: '20px',
                                            padding: '10px 12px',
                                            borderRadius: 4,
                                            outline: 'none',
                                        }}
                                    />
                                    {dataUser && dataUser.username !== '' && dataUser.username !== null && (
                                        <FontAwesomeIcon
                                            icon={faX}
                                            onClick={() => handleClearInput('username')}
                                            style={{
                                                position: 'absolute',
                                                right: 9,
                                                fontSize: 12,
                                                color: 'var(--primary-color)',
                                                cursor: 'pointer',
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="form-info d-flex" style={{ display: 'flex', marginTop: 34, marginLeft: 17 }}>
                            <label
                                style={{
                                    minWidth: 110,
                                    width: 110,
                                    fontSize: '14px',
                                    color: 'rbg(51, 51, 51)',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                Giới tính
                            </label>
                            <div className="d-flex gap-4">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        onChange={(e) => handleOnchangeValueUser('gender', true)}
                                        value={true}
                                        type="radio"
                                        name="gender"
                                        checked={dataUser.gender === true}
                                    />
                                    <label className="form-check-label">Nam</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        onChange={(e) => handleOnchangeValueUser('gender', false)}
                                        value={false}
                                        type="radio"
                                        name="gender"
                                        checked={dataUser.gender === false}
                                    />
                                    <label className="form-check-label">Nữ</label>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <label
                                style={{
                                    minWidth: 110,
                                    width: 110,
                                    fontSize: '14px',
                                    color: 'rbg(51, 51, 51)',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            ></label>
                            <div className="mt-4 d-flex ms-5" onClick={() => handleSubmitFormInfoUser()}>
                                <Button normal> Lưu Thay Đổi</Button>
                            </div>
                        </div>
                    </div>
                    <div
                        className="info-vertical col-1"
                        style={{ margin: '16px 0px', borderLeft: '1px solid rgb(235, 235, 240)' }}
                    ></div>

                    {/* note */}
                    <div className="info-right col-4">
                        <div>
                            <div
                                className="info-title pt-3"
                                style={{
                                    fontSize: 16,
                                    lineHeight: '24px',
                                    fontWeight: 500,
                                    color: 'rgb(100, 100, 109)',
                                }}
                            >
                                Số điện thoại và email
                            </div>
                            <div className="info-item d-flex justify-content-between  align-items-center mt-3">
                                <div className="info-item__content d-flex align-items-center">
                                    <LocalPhoneOutlinedIcon className="me-1" />
                                    <div>
                                        <span
                                            style={{
                                                fontSize: '14px',
                                                lineHeight: '20px',
                                                margin: '0px 0px 0px 6px',
                                                color: 'rgb(56, 56, 61)',
                                                display: 'block',
                                            }}
                                        >
                                            Số điện thoại
                                        </span>
                                        <span
                                            style={{
                                                fontSize: '14px',
                                                lineHeight: '20px',
                                                margin: '0px 0px 0px 6px',
                                                color: 'rgb(56, 56, 61)',
                                                display: 'block',
                                            }}
                                        >
                                            {dataUser?.phone}
                                        </span>
                                    </div>
                                </div>

                                <div className="info-item__actions">
                                    <Button outline small>
                                        Cập nhật
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="info-item d-flex justify-content-between  align-items-center mt-3">
                                <div className="info-item__content d-flex align-items-center">
                                    <EmailOutlinedIcon className="me-1" />
                                    <div>
                                        <span
                                            style={{
                                                fontSize: '14px',
                                                lineHeight: '20px',
                                                margin: '0px 0px 0px 6px',
                                                color: 'rgb(56, 56, 61)',
                                                display: 'block',
                                            }}
                                        >
                                            Email
                                        </span>
                                        <span
                                            style={{
                                                fontSize: '14px',
                                                lineHeight: '20px',
                                                margin: '0px 0px 0px 6px',
                                                color: 'rgb(56, 56, 61)',
                                                display: 'block',
                                            }}
                                        >
                                            {dataUser?.email}
                                        </span>
                                    </div>
                                </div>

                                <div className="info-item__actions">
                                    <Button outline small>
                                        Cập nhật
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div
                                className="info-title pt-3"
                                style={{
                                    fontSize: 16,
                                    lineHeight: '24px',
                                    fontWeight: 500,
                                    color: 'rgb(100, 100, 109)',
                                }}
                            >
                                Bảo mật
                            </div>
                            <div className="info-item d-flex justify-content-between  align-items-center mt-3">
                                <div className="info-item__content d-flex align-items-center">
                                    <LockOutlinedIcon />
                                    <div>
                                        <span
                                            style={{
                                                fontSize: '14px',
                                                lineHeight: '20px',
                                                margin: '0px 0px 0px 6px',
                                                color: 'rgb(56, 56, 61)',
                                                display: 'block',
                                            }}
                                        >
                                            Đổi mật khẩu
                                        </span>
                                    </div>
                                </div>

                                <div className="info-item__actions">
                                    <Button outline small>
                                        Cập nhật
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoUserPage;
