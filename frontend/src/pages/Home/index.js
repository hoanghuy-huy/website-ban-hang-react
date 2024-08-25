// import ImageSlider from '~/layouts/components/ImageSlider';
import ProductBox from '~/components/ProductBox';
import ImageSlider from './Sections/ImageSlider';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProductHot, fetchAllProductPagination } from '~/redux/features/productSlice/productSlice';
import HotProductBox from './Sections/HotProductBox';
import NProgress from 'nprogress';

import './Home.scss';
import FlashSales from '~/components/FlashSales';
import { CircularProgress } from '@mui/material';
import FeaturedCategory from '~/components/FeaturedCategory';
import Product from '~/components/Product';

function Home() {
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const listProductHot = useSelector((state) => state.products.listProductHot);
    const listProductPagination = useSelector((state) => state.products.listProductPagination);
    const state = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(fetchAllProductHot());
        dispatch(fetchAllProductPagination({ limit, page }));
        // eslint-disable-next-line
    }, []);

    const handlePageClick = () => {
        setLimit(limit + 5);
    };

    useEffect(() => {
        dispatch(fetchAllProductPagination({ limit, page }));

        // eslint-disable-next-line
    }, [limit]);

    if (state.loading === true && state.error === false) {
        return <div>Loading...</div>;
    }

    if (state.loading === false && state.error === true) {
        return <div>Something wrong with server</div>;
    }

    if (!listProductHot || !listProductPagination) {
        return <div>Fetching data...</div>;
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
