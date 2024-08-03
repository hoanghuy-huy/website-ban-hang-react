import httpRequest from '~/utils/httpRequest';

const apiCreateRole = async (data) => {
    try {
        const res = await httpRequest.post('roles/create', data);

        return res;
    } catch (error) {
        console.log(error);
    }
};

const apiGetAllRole = async () => {
    try {
        const res = await httpRequest.get('roles/read');

        return res;
    } catch (error) {
        console.log(error);
    }
};

const apiDeleteRole = async (id) => {
    try {
        const res = await httpRequest.put('roles/delete', { id: id });

        return res;
    } catch (error) {
        console.log(error);
    }
};

const apiGetRoleByGroup = async (idGroup) => {
    try {
        const res = await httpRequest.get(`roles/by-group?idGroup=${idGroup}`);

        return res;
    } catch (error) {
        console.log(error);
    }
};

export { apiCreateRole, apiGetAllRole, apiDeleteRole, apiGetRoleByGroup };
