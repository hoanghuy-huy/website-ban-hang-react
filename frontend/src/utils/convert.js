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

export const convertDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = String(date.getFullYear()).slice(-2); // Lấy 2 chữ số cuối của năm
    return `${day}/${month}/${year}`;
};
