import React, {  memo, useEffect, useState } from 'react';
import { Button, Icon, IconButton } from '@mui/material';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
const PaginationProduct = ({ currentPage, setCurrentPage, totalPages }) => {
    return (
        <div className="btn-pagination col-2 d-flex align-items-center justify-content-end">
            <div className="btn-pagination__state">
                <span className="btn-pagination__current-page"> {currentPage}</span>/
                <span className="btn-pagination__total-page">{totalPages}</span>
            </div>
            <div className="btn-pagination-style btn-pagination__previous-page">
                <IconButton onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    <NavigateBefore />
                </IconButton>
            </div>
            <div className="btn-pagination-style btn-pagination__next-page">
                <IconButton onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    <NavigateNext />
                </IconButton>
            </div>
        </div>
    );
};

export default memo(PaginationProduct);
