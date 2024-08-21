import HeaderClient from '~/layouts/components/HeaderClient';
import { Sidebar } from '../components/Sidebar';

import './LayoutClient.scss';

function LayoutClient({ children }) {

    
    return (
        <div className="wrapper-layout">
            <HeaderClient />
            <div className="col-12 container-body mt-5">
                <div className="row mx-3">
                    <div className="col-2  mt-5 container-side-bar">
                        <Sidebar />
                    </div>
                    <div className="content col-10 mt-5" >{children}</div>
                </div>
            </div>
        </div>
    );
}

export default LayoutClient;
