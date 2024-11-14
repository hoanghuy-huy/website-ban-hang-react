import React from 'react';
import Pagination from '@mui/material/Pagination';

const PaginationComponent = ({ page, limit, color, totalPages, setCurrentPage }) => {
    const handleChange = (event, value) => {
        setCurrentPage(value)
    };
    return (
        <div>
            {' '}
            <Pagination color={color ? color : 'primary'} onChange={handleChange} page={page} count={totalPages} variant="outlined" shape="rounded" />
        </div>
    );
};

export default PaginationComponent;
