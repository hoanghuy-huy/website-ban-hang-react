import React from 'react';
import Header from './Header';
import './MainLayout.scss';
import Sidebar from '~/components/Sidebar';
import Footer from '~/components/Footer';

const MainLayout = ({ children }) => {
    return (
        <div className="MainLayout">
            <Header />
            <div className="body-container">
                <div className="row px-4">
                    <div className="col-sm-2 mt-3 ">
                        <Sidebar />
                    </div>
                    <div className="col-sm-10 mt-3 main-content">
                        {children}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;
