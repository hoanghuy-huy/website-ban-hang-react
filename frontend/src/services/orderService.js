import * as httpRequest from '~/utils/httpRequest';

const getRevenueByDay = async (dayAgo) => {
    try {
        const res = await httpRequest.get(`order/get-revenue-by-day?dateAgo=${dayAgo}`);

        return res;
    } catch (error) {
        console.log(error);
    }
};



export { getRevenueByDay };
