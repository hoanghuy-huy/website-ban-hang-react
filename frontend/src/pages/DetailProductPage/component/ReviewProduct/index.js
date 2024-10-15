import React, { useEffect } from 'react';
import './ReviewProduct.scss';
import { Button, Rating } from '@mui/material';
import Image from '~/components/Image';
import CommentInput from './CommentInput';
import Comment from './Comment';
import { useDispatch, useSelector } from 'react-redux';
import { getAllComment } from '~/redux/features/commentSlice';



import { Avatar, Checkbox, Tooltip } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
const ReviewProduct = ({ product }) => {
    const dispatch = useDispatch();
    const { commentList } = useSelector((state) => state.comment);
    useEffect(() => {
        dispatch(getAllComment({ productId: product.productId, page: 1, limit: 5 }));
    }, []);
    const { totalPages, comments } = commentList;

    return (
        <div className="ReviewProduct">
            <div className="ReviewProductContainer">
                <div className="ReviewProduct-Title">
                    <p>Khách hàng đánh giá</p>
                </div>
                <div className="product-rating-overview">
                    <div className="product-rating-overview__briefing">
                        {true ? (
                            <>
                                <div className="product-rating-overview__score-wrapper">
                                    <span class="product-rating-overview__rating-score">{product.starsNumber}</span>
                                    <span class="product-rating-overview__rating-score-out-of"> trên 5 </span>
                                </div>
                                <div className="product-rating-overview__stars">
                                    <Rating value={product.starsNumber} readOnly sx={{ fontSize: 20 }} />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="product-rating-overview__score-wrapper">
                                    <span class="product-rating-overview__rating-score-out-of">
                                        {' '}
                                        Chưa có đánh giá nào{' '}
                                    </span>
                                </div>
                            </>
                        )}
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
                        {comments && comments.length > 0 ? (
                            comments.map((item) => {
                                return (
                                    <div className="product-rating">
                                        <div className="product-rating__avatar">
                                            <Avatar />
                                        </div>

                                        <div className="product-rating__main">
                                            <div className="product-rating__author-name">username </div>
                                            <div className="product-rating__rating">
                                                <Rating value={item.starNumber} readOnly sx={{ fontSize: 14 }} />
                                            </div>
                                            <div className="product-rating__time">{(item.updatedAt).split('T')[0]}</div>
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
                                                            <Checkbox
                                                                icon={<ThumbUpOutlinedIcon />}
                                                                checkedIcon={<ThumbUpIcon />}
                                                            />
                                                        </Tooltip>

                                                        {
                                                            item.like > 0 ?
                                                            <div className="product-rating__count-like">{item.like}</div> :
                                                            <div className="product-rating__count-like">Hữu ích?</div> 
                                                        }
                                                    </div>
                                                    {/* <div className="product-rating__reply cursor">Trả lời</div> */}
                                                </div>
                                            </div>
                                            {/* <ReplyCommentText  */}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="product-rating">
                                <div className="d-flex flex-column align-items-center justify-content-center w-100">
                                    <div className="no-data-icon d-flex justify-content-center align-items-center">
                                        <Image src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/shoprating/7d900d4dc402db5304b2.png" />
                                    </div>
                                    <div className="no-data-text">Chưa có đánh giá</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Comment here */}
                <CommentInput />
            </div>
        </div>
    );
};

export default ReviewProduct;
