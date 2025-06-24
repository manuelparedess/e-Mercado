import { Box, Divider, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom';
import Pagination from '../../components/common/Pagination';
import ListItemProduct from '../../components/modules/ListItemProduct';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

const MyProductsPage = () => {

    const { info, results } = useLoaderData();

    return (
        <Box sx={{ px: { xs: 2, md: 8 }, py: 4 }}>

            <Typography className='ff-noto-sans' variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#1f8946' }}>
                Mis productos
            </Typography>
            <Divider sx={{ mb: 4, borderColor: 'primary.main' }} />

            {results.length ? (
                <>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 3,
                            justifyContent: "center",
                            mt: 2,
                        }}
                    >
                        {results.map((product) => (
                            <ListItemProduct product={product} key={product._id} />
                        ))}
                    </Box>
                    <Pagination pagination={info} />
                </>
            ) : (
                <Box
                    sx={{
                        py: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                >
                    <Inventory2OutlinedIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6">
                        No hay productos publicados.
                    </Typography>
                </Box>
            )}
        </Box>
    )
}

export default MyProductsPage;