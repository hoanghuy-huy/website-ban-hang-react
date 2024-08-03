import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '~/hooks/userContext';

export const PrivateRoute = ({ children }) => {
    const { user } = useContext(UserContext);

    if (user && user.auth) {
        return children;
    }

    return <Navigate to="/" />;
};
