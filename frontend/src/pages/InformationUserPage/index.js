import React from 'react';
import Image from '~/components/Image';
import './InformationUserPage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faX } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button/Button';

const InformationUserPage = () => {
    return (
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
                        <div className="form-avatar">
                            <Image
                                style={{ height: 104, width: 104, borderRadius: '50%' }}
                                src="https://salt.tikicdn.com/cache/512x512/ts/avatar/db/40/84/abb45028401bfb8e035f36b41ac2da0e.jpg"
                            />
                        </div>
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
                                <FontAwesomeIcon
                                    icon={faX}
                                    style={{
                                        position: 'absolute',
                                        right: 9,
                                        fontSize: 12,
                                        color: 'var(--primary-color)',
                                    }}
                                />
                            </div>
                            <div
                                className="nickname"
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
                                    Nickname
                                </div>
                                <input
                                    placeholder="Nhập nickname của bạn"
                                    maxLength={128}
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
                                <FontAwesomeIcon
                                    icon={faX}
                                    style={{
                                        position: 'absolute',
                                        right: 9,
                                        fontSize: 12,
                                        color: 'var(--primary-color)',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-info" style={{ marginTop: 16, display: 'flex' }}>
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
                            Ngày sinh
                        </label>
                        <div className="form-selected-container d-flex align-items-center">
                            <div className="day">
                                <select
                                    class="form-select"
                                    style={{
                                        width: 100,
                                        height: 34,
                                        lineHeight: '20px',
                                        outline: 'none',
                                        borderRadius: 4,
                                        border: '1px solid rgb(204, 204, 204)',
                                    }}
                                >
                                    <option value="null" selected>
                                        Ngày
                                    </option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div className="day">
                                <select
                                    class="form-select"
                                    style={{
                                        width: 100,
                                        height: 34,
                                        lineHeight: '20px',
                                        outline: 'none',
                                        borderRadius: 4,
                                        border: '1px solid rgb(204, 204, 204)',
                                    }}
                                >
                                    <option value="null" selected>
                                        Ngày
                                    </option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>{' '}
                            <div className="day">
                                <select
                                    class="form-select"
                                    style={{
                                        width: 100,
                                        height: 34,
                                        lineHeight: '20px',
                                        outline: 'none',
                                        borderRadius: 4,
                                        border: '1px solid rgb(204, 204, 204)',
                                    }}
                                >
                                    <option value="null" selected>
                                        Ngày
                                    </option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="form-info" style={{ marginTop: 16, display: 'flex', marginTop: 34 }}>
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
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="gender" />
                                <label class="form-check-label">Nam</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="gender" />
                                <label class="form-check-label">Nữ</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="gender" />
                                <label class="form-check-label">Khác</label>
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
                        <div style={{ marginTop: 34, width: 176 }}>
                            <Button normal> Lưu Thay Đổi</Button>
                        </div>
                    </div>
                </div>
                <div
                    className="info-vertical col-1"
                    style={{ margin: '16px 0px', borderLeft: '1px solid rgb(235, 235, 240)' }}
                ></div>
                <div className="info-right col-4">
                    <div>
                        <div
                            className="info-title pt-3"
                            style={{ fontSize: 16, lineHeight: '24px', fontWeight: 500, color: 'rgb(100, 100, 109)' }}
                        >
                            Số điện thoại và email
                        </div>
                        <div className="info-item d-flex justify-content-between  align-items-center mt-3">
                            <div className="info-item__content d-flex align-items-center">
                                <FontAwesomeIcon icon={faPhone} style={{ paddingRight: 10 }} />
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
                                        0123123132
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
    );
};

export default InformationUserPage;
