import React, { useState } from 'react'
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, List, ListItemButton, ListItemText, Divider, Tabs, Tab } from "@mui/material";
import ProductResult from '../../components/modules/ProductResult';
import Pagination from '../../components/common/Pagination';

const categories = ['Tecnología', 'Hogar', 'Calzado', 'Ropa', 'Accesorios', 'Vehiculos']

const CategoryPage = () => {

    const { info, results } = useLoaderData();
    const { search } = useLocation();
    const category = new URLSearchParams(search).get('q');
    const navigate = useNavigate();

    const [value, setValue] = useState(category);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        navigate(`/category?q=${newValue}`);
    };

    return (
        <Box sx={{ display: { lg: 'block', xl: "flex" }, py: {xs: 1, sm: 4}, px: { xs: 0.5, sm: 2, md: 5 }, mt: { xs: 0, xl: 3 } }}>
            {/* ASIDE */}
            <Box sx={{ width: { lg: 100, xl: 200 }, pr: 4, display: { xs: 'none', xl: 'block' } }}>
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
            {/* NAVTABS */}
            <Box sx={{ width: 600, display: { xs: 'none', lg: 'block', xl: 'none' }, mb: 2 }}>
                <Typography variant="h4" gutterBottom fontWeight={600} sx={{ color: 'primary.main' }}>
                    Categorías
                </Typography>
                <Divider sx={{ mb: 2, borderColor: 'primary.main' }} />

                <Tabs
                    orientation="horizontal"
                    value={value}
                    onChange={handleChange}
                    sx={{
                        backgroundColor: 'rgba(31, 137, 70, 0.7)',
                        borderRadius: 2,
                        '& .MuiTab-root': {
                            color: '#fff',
                            alignItems: 'flex-start',
                            textTransform: 'none',
                            px: 2,
                        },
                        '& .Mui-selected': {
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        },
                        '& .MuiTab-root:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                    }}
                >
                    {categories.map((cat) => (
                        <Tab
                            key={cat}
                            label={cat.charAt(0).toUpperCase() + cat.slice(1)}
                            value={cat}
                        />
                    ))}
                </Tabs>
            </Box>


            <Box sx={{ flex: 1 }}>
                <Typography className='ff-noto-sans' variant="h4" sx={{ fontWeight: 'bold', color: 'white', mb: 3, display: { xs: 'none', sm: 'block'} }} gutterBottom>
                    Categoría:{' '}
                    <Typography component="span" variant="h5" sx={{ color: 'primary.main' }}>
                        {category}
                    </Typography>
                </Typography>

                <Typography className='ff-noto-sans' variant="h5" sx={{ fontWeight: 'bold', color: 'white', my: 2, px: 2, display: { xs: 'block', sm: 'none' } }} gutterBottom>
                    Categoría:{' '}
                    <Typography component="span" variant="h6" sx={{ color: 'primary.main' }}>
                        {category}
                    </Typography>
                </Typography>

                <Grid container spacing={{ xs: 1.5, sm: 3 }} sx={{ justifyContent: 'space-around', mb: 3, px: { xs: 0, sm: 3, md: 5, lg: 0 } }}>
                    {results.map((product) => (
                        <ProductResult key={product._id} product={product} />
                    ))}
                </Grid>
                <Pagination pagination={info} />
            </Box>
        </Box>
    )
}

export default CategoryPage