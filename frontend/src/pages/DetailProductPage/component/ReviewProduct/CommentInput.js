import { Avatar, Button, Tooltip } from '@mui/material';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import StarIcon from '@mui/icons-material/Star';
import './ReviewProduct.scss';

const CommentInput = () => {
    const handleOnChangeImage = (filesImage) => {
        console.log(filesImage)
    };
    return (
        <div className="CommentInput">
            <div className="CommentInput-container">
                <Avatar sx={{ fontSize: 32 }} />
                <div className="CommentInput__wrapper">
                    <textarea placeholder="Viết câu trả lời" />
                    <Tooltip title="Bình luận">
                        <SendIcon className="icon-send" />
                    </Tooltip>
                </div>
            </div>

            <div className="action-review ms-5 d-flex gap-3 mt-2">
                <div className="starNumber-rating">
                    <Button
                        component="label"
                        role={undefined}
                        variant="outlined"
                        tabIndex={-1}
                        startIcon={<AddPhotoAlternateIcon />}
                        className="rounded me-2"
                        type="file"
                    >
                        Thêm ảnh
                        <input
                            type="file"
                            className="input-upload-img"
                            multiple
                            accept="image/png, image/jpeg" 
                            onChange={(e) => handleOnChangeImage(e.target.files)}
                        />
                    </Button>
                    <Button variant="outlined" className="rounded me-2">
                        5
                        <StarIcon className="star-color" />
                        Cực Kì Hài Lòng
                    </Button>
                    <Button variant="outlined" className="rounded me-2">
                        4
                        <StarIcon className="star-color" />
                        Hài Lòng
                    </Button>
                    <Button variant="outlined" className="rounded  me-2">
                        3
                        <StarIcon className="star-color" />
                        Bình Thường
                    </Button>
                    <Button variant="outlined" className="rounded me-2">
                        2
                        <StarIcon className="star-color" />
                        Không Hài Lòng
                    </Button>
                    <Button variant="outlined" className="rounded me-2 mt-2">
                        1
                        <StarIcon className="star-color" />
                        Rất không hài lòng
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CommentInput;
