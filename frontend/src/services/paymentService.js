import httpRequest from '~/utils/httpRequest';

const apiGetClientId = async () => {
    try {
        const res = await httpRequest.get('payment/get-client-id');

        return res;
    } catch (error) {
        console.log(error);
    }
};

export { apiGetClientId };
