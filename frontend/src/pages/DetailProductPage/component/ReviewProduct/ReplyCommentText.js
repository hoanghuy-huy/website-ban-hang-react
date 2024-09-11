import { Avatar, IconButton, Input } from '@mui/material';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';

import './ReviewProduct.scss';

const ReplyCommentText = () => {
    return (
        <div className="replyCommentText">
            <div className="replyCommentText-container d-flex align-items-center gap-2 py-3 ">
                <Avatar sx={{ fontSize: 32 }} />
                <div className="replyCommentText__wrapper">
                    Hello anh em

                </div>
            </div>
        </div>
    );
};

export default ReplyCommentText;
