import React, { useEffect } from 'react';
import DashBoardBox from './DashBoardBox';
import PaidIcon from '@mui/icons-material/Paid';
import TableProduct from '../TableProduct';
import './DashBoardPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategories } from '~/redux/features/categorySlice/categorySlice';
import { getAllBrandAdmin } from '~/redux/features/brandSlice';
const DashBoardPage = () => {
    const catList = useSelector((state) => state.categories.categoryList);
    const brandList = useSelector((state) => state.brand.brandListAdmin);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllCategories());
        dispatch(getAllBrandAdmin());
    }, []);

    return (
        <div className="DashBoardPage w-100">
            <div className="row DashBoardWrapperRow">
                <div className="col-md-8">
                    <div className="DashBoardPageWrapper d-flex">
                        <DashBoardBox color={['#1da256', '#48d483']} />
                        <DashBoardBox color={['#c012e2', '#eb64fe']} />
                        <DashBoardBox color={['#2c78e5', '#60aff5']} />
                        <DashBoardBox color={['#e1950e', '#f3cd29']} />
                    </div>
                </div>

                <div className="col-md-4 pl-0">
                    <div className="box">
                        <div>
                            <h4 className="text-white">Tổng sản phẩm đã bán</h4>
                            <span className="text-white">290</span>
                            <div>
                                <div className="d-flex align-items-end justify-content-center">
                                    <h4 className="text-white mt-5 w-100  mb-0">Tổng doanh thu</h4>
                                    <PaidIcon className="text-white" />
                                </div>
                                <span className="text-white">290</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <TableProduct cat={catList} brand={brandList}/>
        </div>
    );
};

export default DashBoardPage;
