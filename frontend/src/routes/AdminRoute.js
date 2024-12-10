import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AdminRoute = ({ children }) => {
    const auth = useSelector((state) => state.account.auth)
    const role = useSelector((state) => state.account.account.userGroup)
    if (auth && role === 'admin') {
        return children;
    }
    

    return <Navigate to="/" />;
};
