// import ImageSlider from '~/layouts/components/ImageSlider';
import './Home.scss';
import ProductBox from '~/components/ProductBox';
import ImageSlider from './Sections/ImageSlider';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProductHot, fetchAllProductPagination } from '~/redux/features/productSlice/productSlice';
import HotProductBox from './Sections/HotProductBox';

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
        return <div>loading...</div>;
    }

    if (state.loading === false && state.error === true) {
        return <div>Something wrong with server</div>;
    }

    if(!listProductHot || !listProductPagination) {
        return <div>Fetching data...</div>
    }
    return (
        <div className="content-home">

            <ImageSlider />
            <HotProductBox listHotProduct={listProductHot} />
            <ProductBox
                listProductPagination={listProductPagination}
                handlePageClick={(e) => handlePageClick(e)}
                limit={limit}
            />
        </div>
    );
}

export default Home;
