import Header from '~/layouts/MainLayout/Header';

import './LayoutCategoryProduct.scss';
import Sidebar from './Sidebar';
import SidebarFilter from './SidebarFilter';

function LayoutCategoryProduct({ children }) {
    return (
        <div className="LayoutCategoryProduct">
            <Header />
            <div className="body-container">
                <div className="row px-4">
                    <div className="col-sm-2 mt-3 ">
                        <Sidebar />
                        <SidebarFilter />
                    </div>
                    <div className="col-sm-10 mt-3 main-content">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LayoutCategoryProduct;
