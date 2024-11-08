import React, { useEffect } from 'react';
import DashBoardBox from './DashBoardBox';
import PaidIcon from '@mui/icons-material/Paid';
import TableProduct from '../TableProduct';
import './DashBoardPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategories } from '~/redux/features/categorySlice/categorySlice';
import { getAllBrandAdmin } from '~/redux/features/brandSlice';
import { totalUserApi } from '~/redux/features/userSlice';
import {
    totalOrderReturnApi,
    totalOrderSoldApi,
    totalProductsSold,
    totalRevenueApi,
} from '~/redux/features/orderSlice';
import { countProductApi } from '~/redux/features/productSlice/productSlice';
import { convertPrice } from '~/utils/convert';
import RevenueChart from './RevenueChart';
const DashBoardPage = () => {
    const catList = useSelector((state) => state.categories.categoryList);
    const brandList = useSelector((state) => state.brand.brandListAdmin);
    const totalUser = useSelector((state) => state.user.totalUser);
    const totalProduct = useSelector((state) => state.products.countProduct);
    const totalRevenue = useSelector((state) => state.order.totalRevenue);
    const totalProductSold = useSelector((state) => state.order.totalProductSold);
    const totalOrderSold = useSelector((state) => state.order.totalOrderSold);
    const totalOrderReturn = useSelector((state) => state.order.totalOrderReturn);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllCategories());
        dispatch(getAllBrandAdmin());
        dispatch(totalUserApi());
        dispatch(totalProductsSold());
        dispatch(totalRevenueApi());
        dispatch(countProductApi());
        dispatch(totalOrderSoldApi());
        dispatch(totalOrderReturnApi());
    }, []);

    return (
        <div className="DashBoardPage w-100">
            <div className="row DashBoardWrapperRow">
                <div className="col-md-8">
                    <div className="DashBoardPageWrapper d-flex">
                        <DashBoardBox title="Tổng người dùng" total={totalUser} color={['#1da256', '#48d483']} />
                        <DashBoardBox title="Tổng sản phẩm" total={totalProduct} color={['#c012e2', '#eb64fe']} />
                        <DashBoardBox
                            title="Tổng số lượng sản phẩm bị trả về"
                            total={totalOrderReturn ? totalOrderReturn : 0}
                            color={['#2c78e5', '#60aff5']}
                        />
                        <DashBoardBox
                            title="Tổng sản phẩm đã bán"
                            total={totalOrderSold}
                            color={['#e1950e', '#f3cd29']}
                        />
                    </div>
                </div>

                <div className="col-md-4 pl-0">
                    <div className="box">
                        <div>
                            <h4 className="text-white">Tổng sản phẩm đã bán</h4>
                            <span className="text-white">{totalProductSold}</span>
                            <div>
                                <div className="d-flex align-items-end justify-content-center">
                                    <h4 className="text-white mt-5 w-100  mb-0">Tổng doanh thu</h4>
                                    <PaidIcon className="text-white" />
                                </div>
                                <span className="text-white">{convertPrice(totalRevenue)} VND</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-12 mt-5">
                <RevenueChart />
            </div>
 
            <TableProduct cat={catList} brand={brandList} />
        </div>
    );
};

export default DashBoardPage;
