import React from 'react';
import Header from './Header';
import Sidebar from './Header/Sidebar';
import './MainLayout.scss';
import ImageSlider from '~/pages/Home/Sections/ImageSlider';
import Image from '~/components/Image';
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
        </div>
    );
};

export default MainLayout;
