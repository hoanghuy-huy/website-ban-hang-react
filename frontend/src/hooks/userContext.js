import { createContext, useState, useEffect } from 'react';
import { apiGetAccount } from '../services/userService';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    useEffect(() => {
        if(window.location.pathname !== '/login') {
            fetchData();
        }else {
            setUser({...user, isLoading: false})
        }
        // eslint-disable-next-line
    }, []);

    const defaultUser = {
        isLoading: true,
        auth: false,
        account: {},
    };
    const fetchData = async () => {
        const res = await apiGetAccount();
        if (res && res.EC === 0) {
            let email = res.DT.email;
            let username = res.DT.username;
            let token = res.DT.token;

            let data = {
                auth: true,
                isLoading: false,
                account: { email, username, token },
            };

            setUser(data);
        }else {
            setUser({...defaultUser, isLoading: false})
        }
    };
    // User is the name of the "data" that gets stored in context
    const [user, setUser] = useState(defaultUser);

    // Login updates the user data with a name parameter
    const loginContext = (payload) => {
        setUser({ ...payload, auth: true, isLoading: false });
    };

    // Logout updates the user data to default
    const logoutContext = () => {
        setUser({...defaultUser, isLoading: false})
    };

    return <UserContext.Provider value={{ user, loginContext, logoutContext }}>{children}</UserContext.Provider>;
};

export default UserProvider;
