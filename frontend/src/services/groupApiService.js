import httpRequest from '~/utils/httpRequest';

const apiGetAllGroup = async () => {
    try {
        const res = await httpRequest.get('groups');

        return res;
    } catch (error) {
        console.log(error);
    }
};

export { apiGetAllGroup };
