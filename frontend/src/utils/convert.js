export const convertPrice = (price) => {
    return price ? price.toLocaleString('vi-VN', {
        maximumFractionDigits: 0,
    }) : 0
};
