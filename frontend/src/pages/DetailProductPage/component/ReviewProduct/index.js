import React from 'react';
import './ReviewProduct.scss';
import { Avatar, Button, Checkbox, Rating, Tooltip } from '@mui/material';
import Image from '~/components/Image';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentInput from './CommentInput';
import ReplyCommentInput from './ReplyCommentInput';
import ReplyCommentText from './ReplyCommentText';

const ReviewProduct = () => {
    return (
        <div className="ReviewProduct">
            <div className="ReviewProductContainer">
                <div className="ReviewProduct-Title">
                    <p>Khách hàng đánh giá</p>
                </div>
                <div className="product-rating-overview">
                    <div className="product-rating-overview__briefing">
                        <div className="product-rating-overview__score-wrapper">
                            <span class="product-rating-overview__rating-score">4.7</span>
                            <span class="product-rating-overview__rating-score-out-of"> trên 5 </span>
                        </div>
                        <div className="product-rating-overview__stars">
                            <Rating value={5} readOnly sx={{ fontSize: 20 }} />
                        </div>
                    </div>

                    <div className="product-rating-overview__filters col-12">
                        <div className="row gap-3">
                            <Button className="product-rating-overview__filter col-2" variant="outlined">
                                Tất cả
                            </Button>
                            <Button className="product-rating-overview__filter col-2" variant="outlined">
                                5 Sao
                            </Button>
                            <Button className="product-rating-overview__filter col-2" variant="outlined">
                                4 Sao
                            </Button>
                            <Button className="product-rating-overview__filter col-2" variant="outlined">
                                3 Sao
                            </Button>
                            <Button className="product-rating-overview__filter col-2" variant="outlined">
                                2 Sao
                            </Button>
                            <Button className="product-rating-overview__filter col-2" variant="outlined">
                                1 Sao
                            </Button>
                            <Button className="product-rating-overview__filter col-3" variant="outlined">
                                Có Hình ảnh
                            </Button>
                            <Button className="product-rating-overview__filter col-3" variant="outlined">
                                Có Bình Luận
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="product-ratings__list">
                    <div className="product-comment-list">
                        <div className="product-rating">
                            <div className="product-rating__avatar">
                                <Avatar />
                            </div>
                            <div className="product-rating__main">
                                <div className="product-rating__author-name">Huy</div>
                                <div className="product-rating__rating">
                                    <Rating value={5} readOnly sx={{ fontSize: 14 }} />
                                </div>
                                <div className="product-rating__time">2024-07-18 13:00</div>
                                <div className="product-rating__content">Weo a mazing good'</div>
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
                                                <Checkbox
                                                    icon={<ThumbUpOutlinedIcon />}
                                                    checkedIcon={<ThumbUpIcon />}
                                                />
                                            </Tooltip>

                                            <div className="product-rating__count-like">1</div>
                                        </div>
                                        <div className="product-rating__reply cursor">Trả lời</div>
                                    </div>
                                </div>
                                <ReplyCommentText />

                                <ReplyCommentText />

                                <ReplyCommentInput />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comment here */}
                <CommentInput />
            </div>
        </div>
    );
};

export default ReviewProduct;
