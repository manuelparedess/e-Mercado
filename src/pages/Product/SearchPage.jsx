import React, { useState } from 'react'
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, TextField, InputAdornment, Button } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ProductResult from '../../components/modules/ProductResult';
import Pagination from '../../components/common/Pagination';

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

        <Box sx={{ px: { xs: 2, md: 6 }, py: 4 }}>
            <Box sx={{ display: "flex", justifyContent: 'center', gap: 2 }}>
                <TextField
                    onChange={(e) => setSearchState(e.target.value)}
                    value={searchState}
                    placeholder="Ej. zapatillas, auriculares..."
                    variant="outlined"
                    sx={{
                        backgroundColor: '#fff',
                        borderRadius: 1,
                        width: '30%'
                    }}
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start"><SearchIcon fontSize="large" /></InputAdornment>,
                        },
                    }}
                />

                <Button
                    variant="outlined"
                    sx={{ fontWeight: 'bold', px: 4}}
                    onClick={handleSearch}
                >
                    Buscar
                </Button>
            </Box>

            <Typography className='ff-noto-sans' variant="h4" sx={{ fontWeight: 'bold', color: 'white', my: 4 }} gutterBottom>
                Resultados para:{' '}
                <Typography component="span" variant="h5" sx={{ color: 'primary.main' }}>
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
                        <ProductResult key={product._id} product={product} />
                    ))}
                </Box>
            )}
            <Pagination pagination={info} /> 
        </Box>
    )
}

export default SearchPage