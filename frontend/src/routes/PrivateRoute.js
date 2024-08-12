import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
    const auth = localStorage.getItem('auth')
    
    if (auth) {
        return children;
    }

    return <Navigate to="/" />;
};
