// import ImageSlider from '~/layouts/components/ImageSlider';
import ProductBox from '~/components/ProductBox';
import ImageSlider from './Sections/ImageSlider';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAllProductAuthenticPagination,
    fetchAllProductDiscountPagination,
    fetchAllProductHot,
    fetchAllProductHotPagination,
    fetchAllProductPagination,
} from '~/redux/features/productSlice/productSlice';
import HotProductBox from './Sections/HotProductBox';

import './Home.scss';
import FlashSales from '~/components/FlashSales';
import { CircularProgress } from '@mui/material';
import FeaturedCategory from '~/components/FeaturedCategory';

import Box from '@mui/material/Box';

function Home() {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const { listProductHot, listProductPagination, actionFetchProductHome, loading, error } = useSelector(
        (state) => state.products,
    );
    
    useEffect(() => {
        dispatch(fetchAllProductHot());
        if (actionFetchProductHome.type === 'fetch all product') {
            dispatch(fetchAllProductDiscountPagination({ limit, page }));
        } else if (actionFetchProductHome.type === 'fetch all product hot') {
            dispatch(fetchAllProductHotPagination({ limit, page }));
        } else if (actionFetchProductHome.type === 'fetch all product authentic') {
            dispatch(fetchAllProductAuthenticPagination({ limit, page }));
        } else if (actionFetchProductHome.type === 'fetch all product discount') {
            dispatch(fetchAllProductDiscountPagination({ limit, page }));
        } else {
            dispatch(fetchAllProductPagination({ limit, page }));
        }
        // eslint-disable-next-line
    }, []);

    const handlePageClick = () => {
        setLimit(limit + 10);
    };

    useEffect(() => {
        if (actionFetchProductHome.type === 'fetch all product') {
            dispatch(fetchAllProductDiscountPagination({ limit, page }));
        } else if (actionFetchProductHome.type === 'fetch all product hot') {
            dispatch(fetchAllProductHotPagination({ limit, page }));
        } else if (actionFetchProductHome.type === 'fetch all product authentic') {
            dispatch(fetchAllProductAuthenticPagination({ limit, page }));
        } else if (actionFetchProductHome.type === 'fetch all product discount') {
            dispatch(fetchAllProductDiscountPagination({ limit, page }));
        } else {
            dispatch(fetchAllProductPagination({ limit, page }));
        }
        // eslint-disable-next-line
    }, [limit, actionFetchProductHome.type]);

    useEffect(() => {
        setLimit(10);
        setPage(1);
        // eslint-disable-next-line
    }, [actionFetchProductHome.type]);

    if (loading === true && error === false) {
        return (
            <div>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                    <CircularProgress />
                </Box>
            </div>
        );
    }

    if (loading === false && error === true) {
        return <div>Something wrong with server</div>;
    }

    if (!listProductHot || !listProductPagination) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <CircularProgress sx={{ height: 80, width: 80 }} />
            </Box>
        );
    }
    return (
        <div className="content-home">
            <div className="img-slider-container">
                <ImageSlider />
            </div>
            <div>
                <FeaturedCategory />
            </div>
            <div>
                <HotProductBox listHotProduct={listProductHot} />
            </div>
            <div>
                <FlashSales items={listProductHot} />
            </div>
            <div>
                <ProductBox
                    listProductPagination={listProductPagination}
                    handlePageClick={(e) => handlePageClick(e)}
                    limit={limit}
                />
            </div>
            {/* <div className="productRow">
                <div className="item">
                    <Product />
                </div>
                <div className="item">
                    <Product />
                </div>
                <div className="item">
                    <Product />
                </div>
                <div className="item">
                    <Product />
                </div>
                <div className="item">
                    <Product />
                </div>
                <div className="item">
                    <Product />
                </div>
            </div> */}
        </div>
    );
}

export default Home;
