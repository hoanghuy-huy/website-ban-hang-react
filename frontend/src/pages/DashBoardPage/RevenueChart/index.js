import { BarChart } from '@mui/x-charts';
import { getRevenueByDay } from '~/services/orderService';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import ProductChart from '../ProductChart';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

export default function RevenueChart() {
    const [filter, setFilter] = useState(0);
    let defaultData = [
        {
            name: 'Hôm nay',
            totalRevenue: 0,
            totalProductsSold: 0,
            totalProductReturn: 0,
            value: 0,
        },
        {
            name: '1 ngày trước',
            totalRevenue: 0,
            totalProductsSold: 0,
            totalProductReturn: 0,
            value: 1,
        },
        {
            name: '2 ngày trước',
            totalRevenue: 0,
            totalProductsSold: 0,
            totalProductReturn: 0,
            value: 2,
        },
        {
            name: '3 ngày trước',
            totalRevenue: 0,
            totalProductsSold: 0,
            totalProductReturn: 0,
            value: 3,
        },
        {
            name: '4 ngày trước',
            totalRevenue: 0,
            totalProductsSold: 0,
            totalProductReturn: 0,
            value: 4,
        },
        {
            name: '5 ngày trước',
            totalRevenue: 0,
            totalProductsSold: 0,
            totalProductReturn: 0,
            value: 5,
        },
        {
            name: '6 ngày trước',
            totalRevenue: 0,
            totalProductsSold: 0,
            totalProductReturn: 0,
            value: 6,
        },
    ];



    const [dataProduct, setDataProduct] = useState(defaultData);
    // Chuyển đổi dữ liệu thành định dạng biểu đồ
    const productsSoldSeries = dataProduct.map((data) => data.totalProductsSold);
    const productsReturnedSeries = dataProduct.map((data) => data.totalProductReturn);
    let fetchData = async (value) => {
        let res = await getRevenueByDay(value);
        if (res && res.EC === 0) {
            return res.DT;
        }
    };

    useEffect(() => {
        const fetchAllData = async () => {
            const promises = []; // Tạo mảng để lưu trữ các Promise
            for (let i = 0; i <= 6; i++) {
                promises.push(fetchData(i)); // Đẩy mỗi Promise vào mảng
            }

            const results = await Promise.all(promises); // Chờ tất cả Promise hoàn thành

            const _data = _.cloneDeep(dataProduct); // Clone dữ liệu ban đầu
            results.forEach((data, index) => {
                if (data) {
                    // Nếu có dữ liệu
                    _data[index].totalRevenue = data.totalRevenue ? data.totalRevenue : 0;
                    _data[index].totalProductsSold = data.totalProductSold ? data.totalProductSold : 0;
                    _data[index].totalProductReturn = data.totalProductReturn ? data.totalProductReturn : 0;
                }
            });

            setDataProduct(_data); // Cập nhật state một lần
        };

        fetchAllData(); // Gọi hàm async
    }, []);

    return (
        <div>
            {/* <FormControl>
                <RadioGroup
                    row
                    aria-labelledby="tick-placement-radio-buttons-group-label"
                    name="tick-placement"
                    value={filter}
                    onChange={(event) => setFilter(event.target.value)}
                >
                    <FormControlLabel value={0} control={<Radio />} label="7 ngày qua" />
                    <FormControlLabel value={1} control={<Radio />} label="Tháng này" />
                </RadioGroup>
            </FormControl> */}
            <div>
                <FormLabel
                    id="tick-placement-radio-buttons-group-label"
                    className="text-black d-flex justify-content-center"
                >
                    THỐNG KÊ SẢN PHẨM
                </FormLabel>
                <FormLabel
                    id="tick-placement-radio-buttons-group-label"
                    className="text-black d-flex justify-content-start"
                >
                    Tổng sản phẩm trả lại {dataProduct.reduce((acc, preV) => (acc += preV.totalProductReturn), 0)}
                </FormLabel>
                <FormLabel
                    id="tick-placement-radio-buttons-group-label"
                    className="text-black d-flex justify-content-start"
                >
                    Tổng sản phẩm đã bán {dataProduct.reduce((acc, preV) => (acc += preV.totalProductsSold), 0)}
                </FormLabel>
                <BarChart
                    className="mt-5"
                    series={[
                        {
                            data: productsSoldSeries.reverse(),
                            label: `Sản phẩm đã bán`,
                        },
                        { data: productsReturnedSeries.reverse(), label: 'Sản phẩm trả lại' },
                    ]}
                    height={290}
                    xAxis={[
                        {
                            data: dataProduct.map((data) => data.name).reverse(),
                            scaleType: 'band',
                        },
                    ]}
                    yAxis={[
                        {
                            // label: 'Số lượng sản phẩm',
                            valueFormatter: (value) => `${value}`,
                        },
                    ]}
                    margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                    title="Thống kê sản phẩm Sản phẩm"
                    tooltip={{ valueFormatter: (value) => `${value} sản phẩm` }}
                />
            </div>
            <div>
                <ProductChart dataProduct={dataProduct} />
            </div>
        </div>
    );
}
