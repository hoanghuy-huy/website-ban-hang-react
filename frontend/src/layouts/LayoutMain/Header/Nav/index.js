import React from 'react';
import Button from '@mui/material/Button/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ViewListIcon from '@mui/icons-material/ViewList';
import { Link } from 'react-router-dom';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import './Nav.scss';
const Nav = () => {
    return (
        <div className="navBar d-flex align-items-center">
            <div className="nav-container">
                <div className="row ">
                    <div className="col-sm-3 left-content d-flex align-items-center ps-5">
                        <Button
                            className="bg-color text-color-white"
                            style={{ padding: '5px 20px', textTransform: 'capitalize', gap: 4 }}
                        >
                            <ViewListIcon />
                            Tất cả danh mục
                            <KeyboardArrowDownIcon />
                        </Button>
                    </div>
                    <div className="col-sm-7 center-content d-flex align-item-center mb-0">
                        <nav>
                            <ul className="list list-inline">
                                <li className="list-inline-item">
                                    <Button style={{ height: '100%' }}>
                                        <Link>Home</Link>
                                    </Button>
                                </li>
                                <li className="list-inline-item">
                                    <Button>
                                        <Link>Home</Link>
                                    </Button>
                                </li>
                                <li className="list-inline-item">
                                    <Button>
                                        <Link>Home</Link>
                                    </Button>
                                </li>
                                <li className="list-inline-item">
                                    <Button>
                                        <Link>Home</Link>
                                    </Button>
                                </li>
                                <li className="list-inline-item">
                                    <Button>
                                        <Link>Home</Link>
                                    </Button>
                                </li>
                                <li className="list-inline-item" style={{ position: 'relative'}}>
                                    <Button>
                                        <Link>Page</Link>
                                    </Button>
                                    <div className="dropdownMenu" style={{position: 'absolute'}}>
                                        <ul>
                                            <li >
                                                <Button>
                                                    <Link>About</Link>
                                                </Button>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-sm-2 right-content">
                        <div className="info-contact d-flex align-items-center">
                            <LocalPhoneOutlinedIcon />
                            <div className="info-text">
                                <h5>1900 - 1010</h5>
                                <p>Trung Tâm Hỗ Trợ</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Nav;
