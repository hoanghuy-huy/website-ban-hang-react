import httpRequest from '~/utils/httpRequest';

const apiAssignGroupRole = async (data) => {
    try {
        const res = await httpRequest.post('group-role/create', data);

        return res;
    } catch (error) {
        console.log(error);
    }
};

export { apiAssignGroupRole };
