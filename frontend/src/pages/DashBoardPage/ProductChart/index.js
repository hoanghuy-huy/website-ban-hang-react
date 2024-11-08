import * as React from 'react';
import { BarChart } from '@mui/x-charts';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { convertPrice } from '~/utils/convert';
import { useState } from 'react';

export default function ProductChart({ dataProduct }) {
    // Chuyển đổi dữ liệu thành định dạng biểu đồ
    const revenueSeries = dataProduct.map((data) => data.totalRevenue).reverse();
    const labels = dataProduct.map((data) => data.name).reverse();
    return (
        <div>
            <FormLabel
                id="tick-placement-radio-buttons-group-label"
                className="text-black d-flex justify-content-center"
            >
                THỐNG KÊ DOANH THU
            </FormLabel>
            <FormLabel
                id="tick-placement-radio-buttons-group-label"
                className="text-black d-flex justify-content-start"
            >
                Tổng doanh thu {convertPrice(dataProduct.reduce((acc, preV) => (acc += preV.totalRevenue), 0))} VND
            </FormLabel>

            <BarChart
                className="mt-4"
                series={[
                    {
                        data: revenueSeries,
                        label: 'Doanh thu',
                        valueFormatter: (value) => `${convertPrice(value)} VND`,
                    },
                ]}
                height={290}
                xAxis={[
                    {
                        data: labels,
                        scaleType: 'band',
                        barGapRatio: 0.6,
                    },
                ]}
                yAxis={[
                    {
                        valueFormatter: (value) => `${convertPrice(value)}`,
                    },
                ]}
                title="Doanh thu sản phẩm theo tuần"
                margin={{ top: 10, bottom: 30, left: 100, right: 10 }}
            />
        </div>
    );
}
