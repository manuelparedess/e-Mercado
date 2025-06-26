import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import ProductCard from "../components/modules/ProductCard";
import PublicityCard from "../components/modules/PublicityCard";

import { Box, Typography, Button, TextField, InputAdornment, Grid, useTheme, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const MainScreen = () => {
    //style
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));


    const [search, setSearch] = useState('');
    const products = useLoaderData();
    const navigate = useNavigate();

    const handleSearch = () => {
        if (search.trim().length != 0) navigate(`/product?q=${encodeURIComponent(search)}`);
    }

    return (
        <Box
            className='animate__animated animate__fadeIn'
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(to bottom, #1f8946 10%, rgb(227, 227, 227) 30%)",
            }}
        >
            <Box sx={{ px: { xs: 1, sm: 3, lg: 10 }, py: { xs: 1, md: 5 } }}>
                {
                    isDesktop
                        ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    mb: 6,
                                    mt: 4
                                }}
                            >
                                <Typography className='ff-noto-sans animate__animated animate__slideInDown' variant="h3" sx={{ fontWeight: 'bold', color: 'white', mb: 5 }} gutterBottom>
                                    Buscar productos
                                </Typography>

                                <Box sx={{ display: "flex", gap: 2, width: "60%" }}>
                                    <TextField
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Ej. zapatillas, auriculares..."
                                        variant="standard"
                                        fullWidth
                                        sx={{
                                            '& .MuiInputBase-input': {
                                                color: "white",
                                                fontSize: "1.5rem",
                                                '::placeholder': {
                                                    color: "white",
                                                    opacity: 0.7,
                                                    fontSize: "1.5rem",
                                                },
                                            },
                                            '& .MuiInput-underline:before': {
                                                borderBottomColor: "white",
                                            },
                                            '& .MuiInput-underline:hover:before': {
                                                borderBottomColor: "white",
                                            },
                                            '& .MuiInput-underline:after': {
                                                borderBottomColor: "white",
                                            },
                                            '& .MuiInputAdornment-root svg': {
                                                color: 'white',
                                            },
                                        }}
                                        slotProps={{
                                            input: {
                                                startAdornment: <InputAdornment position="start"><SearchIcon fontSize="large" /></InputAdornment>,
                                            },
                                        }}
                                    />

                                    <Button
                                        variant="outlined"
                                        sx={{ fontWeight: 'bold', px: 4, color: 'white', borderColor: 'white' }}
                                        onClick={handleSearch}
                                    >
                                        Buscar
                                    </Button>
                                </Box>
                            </Box>
                        )
                        : ''
                }

                <PublicityCard />

                <Typography className='ff-noto-sans' sx={{ textAlign: {xs: 'center', md: 'left'},fontWeight: 'bold', color: 'white', mb: 3, fontSize: { xs: '2.5rem', md: '3rem', lg: '3.5rem' } }} gutterBottom>
                    Destacados
                </Typography>

                <Grid
                    container
                    sx={{
                        justifyContent: "center",
                        mt: 2,
                    }}
                    rowSpacing={{ md: 3 }}
                >
                    {products.map((product) => (
                        <ProductCard key={product._id || product.id} product={product} />
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}

export default MainScreen;