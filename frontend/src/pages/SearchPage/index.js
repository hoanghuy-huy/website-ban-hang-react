import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAllProductBestSellerPaginationWithCategoryId,
    fetchAllProductHotPaginationWithCategoryId,
    fetchProductPaginationWithCategoryId,
    handleChangeValueSort,
    searchAllProductApi,
} from '~/redux/features/productSlice/productSlice';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import CartItem from '~/components/CartItem';
import './SearchPage.scss';
import { ThreeDots } from 'react-loader-spinner';
import Pagination from '~/components/Pagination';
import PaginationComponent from '~/components/Pagination';
import ScrollToTop from '~/components/ScrollToTop';
import FilterWrapper from './FilterWrapper';

const SearchPage = () => {
    const {
        loading,
        error,
        category,
        listProductSearch,
        sortValue,
        starNumberCheckBoxValue,
        minPriceRedux,
        maxPriceRedux,
        categoryIdToSearch,
    } = useSelector((state) => state.products);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(8);
    const { descendingPrice, ascendingPrice, brandValueToFilter, keyword } = useSelector((state) => state.products);
    const itemSortPrice = ['Giá', descendingPrice, ascendingPrice];
    const [sortPrice, setSortPrice] = useState(itemSortPrice[0] || []);
    const dispatch = useDispatch();
    const listBrandToFilter = brandValueToFilter.map((item) => item?.brandName);
    ScrollToTop();
    useEffect(() => {
        dispatch(
            searchAllProductApi({
                keyword: keyword,
                page: currentPage,
                limit: limit,
                sort: sortValue,
                starNumber: starNumberCheckBoxValue,
                minPrice: minPriceRedux,
                maxPrice: maxPriceRedux,
                brand: listBrandToFilter,
            }),
        );
    }, [currentPage, sortValue, starNumberCheckBoxValue, minPriceRedux, maxPriceRedux, brandValueToFilter]);
    useEffect(() => {
        dispatch(
            searchAllProductApi({
                keyword: keyword,
                page: currentPage,
                limit: limit,
                categoryId: categoryIdToSearch,
            }),
        );
    }, []);
    if (loading === true && error === false) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <ThreeDots
                    visible={true}
                    height="80"
                    width="80"
                    color="var(--primary-color)"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        );
    } else if (loading === false && error === true) {
        return <div>Error from server</div>;
    }

    return (
        <div className="product-container">
            <div className="title card shadow p-3">Kết quả tìm kiếm của "{keyword ? keyword : 'chưa có'}"</div>

            {listProductSearch?.products?.length > 0 ? (
                <div className="container-cart-item d-flex">
                    <div className="col-12">
                        <div className="row">
                            {listProductSearch &&
                                listProductSearch?.products?.map((item, index) => {
                                    return (
                                        <div className="col-3" key={index}>
                                            <CartItem item={item} />
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="NotFoundProductView">
                    <div>
                        <PrivacyTipIcon />
                        Rất tiếc, không tìm thấy sản phẩm phù hợp với lựa chọn của bạn
                    </div>
                </div>
            )}

            <div className="col-12 d-flex justify-content-center mt-4 mb-5">
                <PaginationComponent
                    setCurrentPage={setCurrentPage}
                    page={currentPage}
                    limit={limit}
                    totalPages={listProductSearch?.totalPages}
                    color="primary"
                />
            </div>
        </div>
    );
};

export default SearchPage;
