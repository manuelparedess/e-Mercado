import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    TextField,
    InputAdornment,
    Card,
    CardMedia,
    CardContent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useLoaderData, useNavigate } from "react-router-dom";
import ProductCard from "../components/modules/ProductCard";

const MainScreen = () => {

    const [search, setSearch] = useState('');
    const products = useLoaderData();
    const navigate = useNavigate();

    const handleSearch = () => {
        if(search.trim().length != 0) navigate(`/product?q=${encodeURIComponent(search)}`);
    }

    return (
        <Box
            className='animate__animated animate__fadeIn'
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(to bottom, #1f8946 10%, rgb(227, 227, 227) 30%)",
            }}
        >
            <Box sx={{ px: 10, py: 5 }}>

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

                <Card sx={{ mb: 6, boxShadow: 3 }}>
                    <CardMedia
                        component="img"
                        height="200"
                        image="https://via.placeholder.com/1200x200?text=Publicidad+destacada"
                        alt="Publicidad"
                    />
                    <CardContent>
                        <Typography variant="h6" fontWeight={600}>
                            ¡Aprovechá nuestras ofertas de temporada!
                        </Typography>
                    </CardContent>
                </Card>

                <Typography className='ff-noto-sans' variant="h3" sx={{ fontWeight: 'bold', color: 'white', mb: 3 }} gutterBottom>
                    Destacados
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 3,
                        justifyContent: "center",
                        mt: 2,
                    }}
                >
                    {products.map((product) => (
                        <ProductCard key={product._id || product.id} product={product} />
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default MainScreen