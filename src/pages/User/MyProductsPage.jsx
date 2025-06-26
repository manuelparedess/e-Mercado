import React from 'react'
import { useLoaderData } from 'react-router-dom';

import Pagination from '../../components/common/Pagination';
import ListItemProduct from '../../components/modules/ListItemProduct';

import { Box, Divider, Grid, Typography } from '@mui/material';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

const MyProductsPage = () => {

    const { info, results } = useLoaderData();

    return (
        <Box sx={{ px: { xs: 0.5, sm: 2, md: 6 }, py: 4 }}>

            <Typography className='ff-noto-sans' variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#1f8946', textAlign: {xs: 'center', md: 'left'} }}>
                Mis productos
            </Typography>
            <Divider sx={{ mb: 4, borderColor: 'primary.main' }} />

            {results.length ? (
                <>
                    <Grid container spacing={{xs: 1.5, sm: 3}} sx={{justifyContent: 'space-around', mb: 3, px: { xs: 0, sm: 3, xl: 0}}}>
                        {results.map((product) => (
                            <ListItemProduct product={product} key={product._id} />
                        ))}
                    </Grid>
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