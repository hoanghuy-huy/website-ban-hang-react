import React, { useState } from 'react';
import Button from '@mui/material/Button';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CategoryIcon from '@mui/icons-material/Category';
import { Link, NavLink } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import routes from '~/config/routes';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LinkIcon from '@mui/icons-material/Link';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
const Sidebar = () => {
    const [activeTab, setActiveTab] = useState(null);
    const [isToggleSubmenu, setToggleSubmenu] = useState(false);
    const isOpenSubmenu = (tabNumber) => {
        setActiveTab(tabNumber);
        setToggleSubmenu(!isToggleSubmenu);
    };
    return (
        <div className="sidebar">
            <ul>
                <li>
                    <NavLink to={'/admin/dash-board'}>
                        <Button className="w-100">
                            <span className="icon">
                                <DashboardOutlinedIcon />
                            </span>
                            <span className="text">Thống kê</span>
                            <span className="arrow">{/* <ArrowForwardIosRoundedIcon /> */}</span>
                        </Button>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/admin/product'}>
                        <Button className="w-100">
                            <span className="icon">
                                <CategoryIcon />
                            </span>
                            <span className="text">Sản phẩm</span>
                            <span className="arrow">{/* <ArrowForwardIosRoundedIcon /> */}</span>
                        </Button>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/admin/user'}>
                        <Button className="w-100">
                            <span className="icon">
                                <AccountCircleIcon />
                            </span>
                            <span className="text">Người dùng</span>
                            <span className="arrow">{/* <ArrowForwardIosRoundedIcon /> */}</span>
                        </Button>
                    </NavLink>
                </li>
                {/* 
                <li>
                    <Button
                        className={`w-100 ${activeTab === 1 && isToggleSubmenu === true ? 'active' : ''}`}
                        onClick={() => isOpenSubmenu(1)}
                    >
                        <span className="icon">
                            <CategoryIcon />
                        </span>
                        <span className="text">Quản lý sản phẩm</span>
                        <span className="arrow">
                            <ArrowForwardIosRoundedIcon />
                        </span>
                    </Button>
                    <div
                        className={`submenu-wrapper ${activeTab === 1 && isToggleSubmenu === true ? 'open' : 'close'}`}
                    >
                        <ul className="submenu">
                            <li>
                                <NavLink to={'/admin/product/view'}>Danh sách sản phẩm</NavLink>
                            </li>
                            <li>
                                <Link>Tạo sản phẩm</Link>
                            </li>
                        </ul>
                    </div>
                </li>

                <li>
                    <Button
                        className={`w-100 ${activeTab === 2 && isToggleSubmenu === true ? 'active' : ''}`}
                        onClick={() => isOpenSubmenu(2)}
                    >
                        <span className="icon">
                            <AccountCircleIcon />
                        </span>
                        <span className="text">Người dùng</span>
                        <span className="arrow">
                            <ArrowForwardIosRoundedIcon />
                        </span>
                    </Button>
                    <div
                        className={`submenu-wrapper ${activeTab === 2 && isToggleSubmenu === true ? 'open' : 'close'}`}
                    >
                        <ul className="submenu">
                            <li>
                                <Link>Danh sách người dùng</Link>
                            </li>
                            <li>
                                <Link>Tạo người dùng</Link>
                            </li>
                        </ul>
                    </div>
                </li> */}
                <li>
                    <NavLink to={'/admin/order'}>
                        <Button className="w-100">
                            <span className="icon">
                                <ShoppingCartOutlinedIcon />
                            </span>
                            <span className="text">Đơn hàng</span>
                        </Button>
                    </NavLink>
                </li>

                <li>
                    <NavLink to={'/admin/return-order'}>
                        <Button className="w-100">
                            <span className="icon">
                                <AssignmentReturnIcon />
                            </span>
                            <span className="text">Quản lý trả hàng</span>
                        </Button>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/admin/chat'}>
                        <Button className="w-100">
                            <span className="icon">
                                <AssignmentReturnIcon />
                            </span>
                            <span className="text">Chat vói khách hàng</span>
                        </Button>
                    </NavLink>
                </li>
                {/* <li>
                    <NavLink to={'/admin/roles'}>
                        <Button className="w-100">
                            <span className="icon">
                                <LinkIcon />
                            </span>
                            <span className="text">Link truy cập</span>
                        </Button>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={routes.groupRole}>
                        <Button className="w-100">
                            <span className="icon">
                                <AdminPanelSettingsIcon />
                            </span>
                            <span className="text">Quyền truy cập</span>
                        </Button>
                    </NavLink>
                </li> */}
            </ul>
        </div>
    );
};

export default Sidebar;
