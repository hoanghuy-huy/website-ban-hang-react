import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const DashBoardBox = (props, width) => {
    return (
        <div
            className="DashBoardBox"
            style={{
                backgroundImage: `linear-gradient(to right, ${props.color[0]}, ${props.color[1]})`,

            }}
        >
            <div className="d-flex w-100">
                <div className="col1">
                    <h4 className="text-white">Tổng người dùng</h4>
                    <span className="text-white">290</span>
                </div>
                <div className="ms-auto">
                    <span className="icon">
                        <AccountCircleIcon />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default DashBoardBox;
