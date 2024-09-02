import React from 'react';
import './SuggestProduct.scss';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAllProductHotPagination,
    handleReassignDataProductHome,
} from '~/redux/features/productSlice/productSlice';

const SuggestProduct = () => {
    const dispatch = useDispatch();
    const { actionFetchProductHome } = useSelector((state) => state.products);
    return (
        <div className="SuggestProduct">
            <div className="SuggestProduct_header">
                <div className="title">Dành cho bạn</div>
                <div className="SuggestProduct_action d-flex">
                    <div
                        className={
                            actionFetchProductHome.type === 'fetch all product'
                                ? 'd-flex flex-column col-2 tab active'
                                : 'd-flex flex-column col-2 tab '
                        }
                        onClick={() => dispatch(handleReassignDataProductHome({ type: 'dataAllProduct' }))}
                    >
                        <div className="action_icon d-flex justify-content-center">
                            <img src="https://salt.tikicdn.com/cache/w100/ts/ta/70/b9/49/43f25c0f4ee6b7a0d918f047e37e8c87.png.webp" />
                        </div>
                        <div className="action_text">Dành cho bạn</div>
                    </div>
                    <div
                        className={
                            actionFetchProductHome.type === 'fetch all product hot'
                                ? 'd-flex flex-column col-2 tab active'
                                : 'd-flex flex-column col-2 tab '
                        }
                        onClick={() =>
                            dispatch(
                                handleReassignDataProductHome({ type: 'dataAllProductHot' }),
                                fetchAllProductHotPagination(),
                            )
                        }
                    >
                        <div className="action_icon d-flex justify-content-center">
                            <img src="https://salt.tikicdn.com/cache/w100/ts/ta/12/59/f8/ef3c42e93fac779a393a5cd98a394ea6.png.webp" />
                        </div>
                        <div className="action_text">Top Deal</div>
                    </div>
                    <div
                        className={
                            actionFetchProductHome.type === 'fetch all product authentic'
                                ? 'd-flex flex-column col-2 tab active'
                                : 'd-flex flex-column col-2 tab '
                        }
                        onClick={() => dispatch(handleReassignDataProductHome({ type: 'dataAllProductAuthentic' }))}
                    >
                        <div className="action_icon d-flex justify-content-center">
                            <CheckCircleIcon fontSize="inherit" />
                        </div>
                        <div className="action_text">Chính hãng</div>
                    </div>
                    <div
                        className={
                            actionFetchProductHome.type === 'fetch all product discount'
                                ? 'd-flex flex-column col-2 tab active'
                                : 'd-flex flex-column col-2 tab '
                        }
                        onClick={() => dispatch(handleReassignDataProductHome({ type: 'dataAllProductDiscount' }))}
                    >
                        <div className="action_icon d-flex justify-content-center">
                            <img src="https://salt.tikicdn.com/cache/w100/ts/ta/a3/2e/66/05032c91d5d30f4171b2642b635c1ef6.png.webp" />
                        </div>
                        <div className="action_text">Gia Dụng -30%</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuggestProduct;
