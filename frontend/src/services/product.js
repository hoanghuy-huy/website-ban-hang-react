import * as httpRequest from '~/utils/httpRequest';

const getAttributeProductApiService = async ({ productId }) => {
    try {
        const res = await httpRequest.get(`products/get-attribute-by-product-id?productId=${productId}`);

        return res;
    } catch (error) {
        console.log(error);
    }
};

export { getAttributeProductApiService };
