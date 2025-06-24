import React from 'react'
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, List, ListItemButton, ListItemText, Divider } from "@mui/material";
import ProductResult from '../../components/modules/ProductResult';
import Pagination from '../../components/common/Pagination';

const categories = ['Tecnología', 'Hogar', 'Calzado', 'Ropa', 'Accesorios', 'Vehiculos']

const CategoryPage = () => {

    const { info, results } = useLoaderData();
    const { search } = useLocation();
    const category = new URLSearchParams(search).get('q');
    const navigate = useNavigate();

    return (
        <Box sx={{ display: "flex", p: 4, mt: 3 }}>
            {/* ASIDE */}
            <Box sx={{ width: 200, pr: 4 }}>
                <Typography variant="h6" gutterBottom fontWeight={600} sx={{ color: 'primary.main' }} >
                    Categorías
                </Typography>
                <Divider sx={{ mb: 2, borderColor: 'primary.main' }} />
                <List
                    sx={{
                        backgroundColor: 'rgba(31, 137, 70, 0.7)',
                        color: '#fff',
                        borderRadius: 2,
                    }}
                >
                    {categories.map((cat) => (
                        <ListItemButton
                            key={cat}
                            selected={cat === category}
                            onClick={() => navigate(`/category?q=${cat}`)}
                            sx={{
                                color: '#fff',
                                '&.Mui-selected': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                },
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                                },
                            }}
                        >
                            <ListItemText
                                primary={cat.charAt(0).toUpperCase() + cat.slice(1)}
                            />
                        </ListItemButton>
                    ))}
                </List>
            </Box>
            <Box sx={{ flex: 1 }}>
                <Typography className='ff-noto-sans' variant="h4" sx={{ fontWeight: 'bold', color: 'white', mb: 3 }} gutterBottom>
                    Resultados para:{' '}
                    <Typography component="span" variant="h5" sx={{ color: 'primary.main' }}>
                        {category}
                    </Typography>
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
                    {results.map((product) => (
                        <ProductResult product={product} key={product._id} />
                    ))}
                </Box>
                <Pagination pagination={info} />
            </Box>
        </Box>
    )
}

export default CategoryPage