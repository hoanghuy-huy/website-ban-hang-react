import React, { useState } from 'react';

const UploadImageBox = () => {
    const [image, setImage] = useState(null)
    // const [fileN]
    return (
        <div className="card shadow bg-white p-4 mt-3">
            <h5>Ảnh sản phẩm</h5>
            <input type='file' multiple name= 'images' />
            <div>

            </div>
        </div>
    );
};

export default UploadImageBox;
