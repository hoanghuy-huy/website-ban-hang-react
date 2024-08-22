import Header from '../MainLayout/Header';
import './LayoutClientNoSidebar.scss';

function LayoutClientNoSidebar({ children }) {
    return (
        <div className="wrapper-layout">
            <Header />
            <div className="col-12 container-body">
                <div className="row">
                    <div className="content mt-5">{children}</div>
                </div>
            </div>
        </div>
    );
}

export default LayoutClientNoSidebar;
