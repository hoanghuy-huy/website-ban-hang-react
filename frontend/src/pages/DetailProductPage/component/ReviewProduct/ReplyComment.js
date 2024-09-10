import { Avatar, IconButton, Input } from '@mui/material';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';

import './ReviewProduct.scss';

const ReplyComment = () => {
    return (
        <div className="replyComment">
            <div className="replyComment-container">
                <Avatar sx={{ fontSize: 32 }} />
                <div className="replyComment__wrapper">
                    <textarea placeholder="Viết câu trả lời" />

                    <SendIcon className='icon disable'/>
                </div>
            </div>
        </div>
    );
};

export default ReplyComment;
