import * as httpRequest from '~/utils/httpRequest';

const apiGetAllUser = async (page, limit) => {
    try {
        const res = await httpRequest.get(`users?page=${page}&limit=${limit}`);

        return res;
    } catch (error) {
        console.log(error);
    }
};

const apiDeleteUser = async (idUser) => {
    try {
        const res = await httpRequest.put(`users/delete`, { id: idUser });

        return res;
    } catch (error) {
        console.log(error);
    }
};

const apiCreateNewUser = async (data) => {
    try {
        const res = await httpRequest.post(`users/create`, data);

        return res;
    } catch (error) {
        console.log(error);
    }
};

const apiGetOneUser = async (id) => {
    try {
        const res = await httpRequest.get(`users/${id}`);

        return res;
    } catch (error) {
        console.log(error);
    }
};

const apiUpdateUser = async (data) => {
    try {
        const res = await httpRequest.put('users/update', data);

        return res;
    } catch (error) {
        console.log(error);
    }
};

const apiGetAccount = async () => {
    try {
        const res = await httpRequest.get('account');

        return res;
    } catch (error) {
        console.log(error);
    }
};

export { apiGetAllUser, apiDeleteUser, apiCreateNewUser, apiGetOneUser, apiUpdateUser, apiGetAccount };
