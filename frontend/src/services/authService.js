import httpRequest from '~/utils/httpRequest';

const apiRegister = async (email, phone, username, password) => {
    try {
        const res = await httpRequest.post('register', { email, phone, username, password });

        return res;
    } catch (error) {
        console.log(error);
    }
};

const apiLogin = async (valueLogin, password) => {
    try {
        const res = await httpRequest.post('login', { valueLogin, password });

        return res;
    } catch (error) {
        console.log(error);
    }
};

const apiLogout = async () => {
    try {
        const res = await httpRequest.post('logout');

        return res;
    } catch (error) {
        console.log(error);
    }
};

export { apiRegister, apiLogin, apiLogout };
