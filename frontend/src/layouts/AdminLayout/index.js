import React from 'react';
import Header from '../MainLayout/Header';
import Sidebar from './Sidebar/index.js';
import './AdminLayout.scss'

function AdminLayout({ children }) {
    return (
        <div className="AdminLayout">
            <div className="AdminLayout-container">
                <Header />
                <div className="main">
                    <div className="sidebar-wrapper">
                        <Sidebar />
                    </div>
                    <div className="content">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;
