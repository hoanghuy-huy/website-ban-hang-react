import Header from '~/layouts/MainLayout/Header';

import './LayoutSearchProduct.scss';
import Sidebar from './Sidebar';
import SidebarFilter from './SidebarFilter';

function LayoutSearchProduct({ children }) {
    return (
        <div className="LayoutSearchProduct">
            <Header />
            <div className="body-container">
                <div className="row px-4">
                    <div className="col-sm-2 mt-4">
                        {/* <SidebarFilter /> */}
                    </div>
                    <div className="col-sm-12 mt-3 main-content">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LayoutSearchProduct;
