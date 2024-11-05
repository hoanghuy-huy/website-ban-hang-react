import React from 'react';
const DashBoardBox = (props) => {
    return (
        <div
            className="DashBoardBox"
            style={{
                backgroundImage: `linear-gradient(to right, ${props.color[0]}, ${props.color[1]})`,

            }}
        >
            <div className="d-flex w-100">
                <div className="col1">
                    <h4 className="text-white">{props.title}</h4>
                    <span className="text-white">{props.total}</span>
                </div>
                <div className="ms-auto">
                    <span className="icon">
                        {props.icon}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default DashBoardBox;
