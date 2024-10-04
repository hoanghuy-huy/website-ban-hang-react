import React from 'react';
import './ReviewProduct.scss';
import { Avatar, Checkbox, Rating, Tooltip } from '@mui/material';
import Image from '~/components/Image';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
const Comment = (item) => {
    console.log(item.like)
    return (
        <div className="product-rating">
            <div className="product-rating__avatar">
                <Avatar />
            </div>

            <div className="product-rating__main">
                <div className="product-rating__author-name">username   </div>
                <div className="product-rating__rating">
                    <Rating value={5} readOnly sx={{ fontSize: 14 }} />
                </div>
                <div className="product-rating__time">2024-07-18 13:00</div>
                <div className="product-rating__content">{item?.content}</div>
                <div className="product-rating__image-list-wrapper">
                    <div className="rating-media-list__container">
                        <div className="rating-media-list__image-wrapper">
                            <Image src="https://down-tx-vn.img.susercontent.com/vn-11134103-7r98o-lvlvt8exu97h2f.webp" />
                        </div>
                        <div className="rating-media-list__image-wrapper">
                            <Image src="https://down-tx-vn.img.susercontent.com/vn-11134103-7r98o-lvlvt8exu97h2f.webp" />
                        </div>
                        <div className="rating-media-list__image-wrapper">
                            <Image src="https://down-tx-vn.img.susercontent.com/vn-11134103-7r98o-lvlvt8exu97h2f.webp" />
                        </div>
                        <div className="rating-media-list__image-wrapper">
                            <Image src="https://down-tx-vn.img.susercontent.com/vn-11134103-7r98o-lvlvt8exu97h2f.webp" />
                        </div>
                    </div>
                </div>
                <div className="product-rating__actions">
                    <div className="d-flex align-items-center">
                        <div className="product-rating__actions-like d-flex align-items-center pe-3">
                            <Tooltip title="Thích">
                                <Checkbox icon={<ThumbUpOutlinedIcon />} checkedIcon={<ThumbUpIcon />} />
                            </Tooltip>

                            <div className="product-rating__count-like">1</div>
                        </div>
                        {/* <div className="product-rating__reply cursor">Trả lời</div> */}
                    </div>
                </div>
                {/* <ReplyCommentText  */}
            </div>
        </div>
    );
};

export default Comment;
