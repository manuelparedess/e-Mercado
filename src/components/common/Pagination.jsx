import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Pagination = ({ pagination }) => {

    const { pathname, search } = useLocation();
    const navigate = useNavigate();

    const handleNext = () => {
        const params = new URLSearchParams(search);

        const currentPage = parseInt(params.get('page') || '1');
        const nextPage = currentPage + 1;

        params.set('page', nextPage.toString());

        navigate(`${pathname}?${params}`);
    }

    const handlePrev = () => {
    
        const params = new URLSearchParams(search);

        const currentPage = parseInt(params.get('page') || '1');
        const prevPage = currentPage - 1;

        params.set('page', prevPage.toString());

        navigate(`${pathname}?${params.toString()}`);
    };


    return (
        <Box display="flex" alignItems="center" sx={{ width: '100%' }} mb={2} gap={2}>
            {/* Prev Button */}
            {pagination.prev && (
                <IconButton
                    className="me-auto"
                    onClick={handlePrev}
                    color="error"
                >
                    <ArrowBackIcon fontSize="large" />
                </IconButton>
            )}

            {/* Next Button */}
            {pagination.next && (
                <IconButton
                    className="ms-auto"
                    onClick={handleNext}
                    color="success"
                >
                    <ArrowForwardIcon fontSize="large" />
                </IconButton>
            )}
        </Box>
    )
}

export default Pagination