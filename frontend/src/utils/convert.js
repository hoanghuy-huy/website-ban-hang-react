export const convertPrice = (price) => {
    return price
        ? price.toLocaleString('vi-VN', {
              maximumFractionDigits: 0,
          })
        : 0;
};

export const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
    });
};
