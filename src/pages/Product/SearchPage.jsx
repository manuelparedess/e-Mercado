import React, { useState } from 'react'
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';

import ProductResult from '../../components/modules/ProductResult';
import Pagination from '../../components/common/Pagination';

import { Box, Typography, Grid, TextField, InputAdornment, Button } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

const SearchPage = () => {

    const { info, results } = useLoaderData();
    const { search } = useLocation();

    const q = new URLSearchParams(search).get('q');
    const [searchState, setSearchState] = useState(q);
    const navigate = useNavigate();

    const handleSearch = () => {
        if(searchState.trim().length != 0) navigate(`/product?q=${encodeURIComponent(searchState)}`);
    }

    return (

        <Box sx={{ px: { xs: 0.5, sm: 2, md: 6 }, pt: { xs: 1, lg: 4 } }}>
            <Box sx={{ display: "flex", justifyContent: 'center', gap: 2 }}>
                <TextField
                    onChange={(e) => setSearchState(e.target.value)}
                    value={searchState}
                    placeholder="Ej. zapatillas, auriculares..."
                    variant="outlined"
                    sx={{
                        backgroundColor: '#fff',
                        borderRadius: 1,
                        width: '30%',
                        display: { xs: 'none', lg: 'flex'}
                    }}
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start"><SearchIcon fontSize="large" /></InputAdornment>,
                        },
                    }}
                />

                <Button
                    variant="outlined"
                    sx={{ fontWeight: 'bold', px: 4, display: { xs: 'none', lg: 'flex'}}}
                    onClick={handleSearch}
                >
                    Buscar
                </Button>
            </Box>

            <Typography className='ff-noto-sans' variant="h4" sx={{ fontWeight: 'bold', color: 'white', my: 4, display: { xs: 'none', md: 'block'} }} gutterBottom>
                Resultados para:{' '}
                <Typography component="span" variant="h5" sx={{ color: 'primary.main' }}>
                    {q}
                </Typography>
            </Typography>

            <Typography className='ff-noto-sans' variant="h5" sx={{ fontWeight: 'bold', color: 'white', my: 2, px: 2, display: { xs: 'block', md: 'none'} }} gutterBottom>
                Resultados para:{' '}
                <Typography component="span" variant="h6" sx={{ color: 'primary.main' }}>
                    {q}
                </Typography>
            </Typography>
            
            {info.count === 0 ? (
                <Box
                    sx={{
                        py: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                >
                    <ProductionQuantityLimitsIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6">
                        No hay resultados para:
                    </Typography>
                    <Typography variant="h5" sx={{ color: 'primary.main', mb: 2 }}>
                        “{q}”
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={{xs: 1.5, sm: 3}} sx={{justifyContent: 'space-around', mb: 3, px: { xs: 0, sm: 3, md: 5, xl: 0}}}>
                    {results.map((product) => (
                        <ProductResult key={product._id} product={product} />
                    ))}
                </Grid>
            )}
            <Pagination pagination={info} /> 
        </Box>
    )
}

export default SearchPage