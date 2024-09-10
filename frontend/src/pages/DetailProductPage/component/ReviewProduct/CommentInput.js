import { Avatar } from '@mui/material';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';

import './ReviewProduct.scss';

const CommentInput = () => {
    return (
        <div className="CommentInput">
            <div className="CommentInput-container">
                <Avatar sx={{ fontSize: 32 }} />
                <div className="CommentInput__wrapper">
                    <textarea placeholder="Viết câu trả lời" />
                    <SendIcon className="icon" />
                </div>
            </div>
        </div>
    );
};

export default CommentInput;
