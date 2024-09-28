import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAllProductBestSellerPaginationWithCategoryId,
    fetchAllProductHotPaginationWithCategoryId,
    fetchProductPaginationWithCategoryId,
    handleChangeValueSort,
} from '~/redux/features/productSlice/productSlice';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import FilterWrapper from '~/components/FilterWrapper';
import CartItem from '~/components/CartItem';
import './Product.scss';
import { ThreeDots } from 'react-loader-spinner';

const ProductPage = () => {
    const {
        loading,
        error,
        category,
        listProductPaginationWithCategory,
        actionFetchProductCategory,
        sortValue,
        starNumberCheckBoxValue,
        minPriceRedux,
        maxPriceRedux,
    } = useSelector((state) => state.products);
    const { categoryId } = useSelector((state) => state.categories);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(8);
    const { descendingPrice, ascendingPrice, brandValueToFilter } = useSelector((state) => state.products);

    const itemSortPrice = ['Giá', descendingPrice, ascendingPrice];
    const [sortPrice, setSortPrice] = useState(itemSortPrice[0] || []);
    const dispatch = useDispatch();
    const listBrandToFilter = brandValueToFilter.map((item) => item?.brandName);

    useEffect(() => {
        if (actionFetchProductCategory.type === 'fetch all product') {
            dispatch(
                fetchProductPaginationWithCategoryId({
                    categoryId,
                    page: currentPage,
                    limit: limit,
                    sort: sortValue,
                    starNumber: starNumberCheckBoxValue,
                    minPrice: minPriceRedux,
                    maxPrice: maxPriceRedux,
                    brand: listBrandToFilter,
                }),
            );
        } else if (actionFetchProductCategory.type === 'fetch all product hot') {
            dispatch(
                fetchAllProductHotPaginationWithCategoryId({
                    categoryId,
                    page: currentPage,
                    limit: limit,
                    sort: sortValue,
                    starNumber: starNumberCheckBoxValue,
                    minPrice: minPriceRedux,
                    maxPrice: maxPriceRedux,
                    brand: listBrandToFilter,
                }),
            );
        } else if (actionFetchProductCategory.type === 'fetch all product best seller') {
            dispatch(
                fetchAllProductBestSellerPaginationWithCategoryId({
                    categoryId,
                    page: currentPage,
                    limit: limit,
                    sort: sortValue,
                    starNumber: starNumberCheckBoxValue,
                    minPrice: minPriceRedux,
                    maxPrice: maxPriceRedux,
                    brand: listBrandToFilter,
                }),
            );
        }
    }, [
        currentPage,
        actionFetchProductCategory,
        sortValue,
        starNumberCheckBoxValue,
        minPriceRedux,
        maxPriceRedux,
        brandValueToFilter,
    ]);

    useEffect(() => {
        setCurrentPage(1);
    }, [categoryId]);

    if (loading === true && error === false) {
        return (
            <div className='d-flex justify-content-center align-items-center' style={{height: '100vh'}}>
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
            <div className="title-content">
                <h2>{category?.name}</h2>
            </div>
            <FilterWrapper
                sortPrice={sortPrice}
                setSortPrice={setSortPrice}
                itemSortPrice={itemSortPrice}
                categoryId={categoryId}
                totalPages={listProductPaginationWithCategory?.totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                actionFetchProductCategory={actionFetchProductCategory}
            />
            {listProductPaginationWithCategory?.products?.length > 0 ? (
                <div className="container-cart-item d-flex">
                    <div className="col-12">
                        <div className="row">
                            {listProductPaginationWithCategory &&
                                listProductPaginationWithCategory?.products?.map((item, index) => {
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
        </div>
    );
};

export default ProductPage;
