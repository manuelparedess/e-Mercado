import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ProductContext } from '../../context/ProductContext';

import Swal from 'sweetalert2';
import FavoriteButton from '../common/FavoriteButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Card, CardContent, CardMedia, Typography, Box, Button, Alert, Grid, Stack } from '@mui/material';

const ProductCard = ({ product }) => {

    const { images, name, price, stock, category } = product;

    const { cart, handleAddToCart } = useContext(ProductContext)
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [stockAvaiable, setStockAvaiable] = useState(stock);

    useEffect(() => {
        if (cart.find(p => p.product._id === product._id)) {
            setStockAvaiable(stock - cart.find(p => p.product._id === product._id).quantity)
        }
    }, [cart]);

    const handleAdd = (e) => {
        e.stopPropagation();
        if (user === null) {
            navigate('/login');
            return;
        }
        handleAddToCart(product, stockAvaiable);
        if (stockAvaiable === 0) {
            Swal.fire({
                icon: 'error',
                title: '¡No hay mas stock!',
                confirmButtonColor: '#1f8946',
            });
        } else {
            Swal.fire({
                icon: 'success',
                title: '¡Agregado al carrito!',
                confirmButtonColor: '#1f8946',
            });
        }
    }



    return (
        <Grid item size={{ xs: 6, md: 4, xl: 3 }}>
            <Card
                onClick={() => navigate(`/product/${product._id}`)}
                sx={{
                    width: { xs: '95%', md: '90%' },
                    height: { xs: '90%', md: 'auto' },
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    boxShadow: 3,
                    overflow: "hidden",
                    cursor: 'pointer',
                    mb: 3,
                    mx: 'auto'
                }}
            >
                <CardMedia
                    component="img"
                    src={`${images[0]}`}
                    alt={name}
                    sx={{
                        height: { xs: 125, md: 160, xl: 200 },
                        objectFit: { xs: 'contain', md: 'cover' },
                    }}
                />
                <CardContent
                    sx={{
                        flexGrow: 1,
                        py: 1.5,
                        px: 2,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "100%",
                    }}
                >
                    <Box>
                        <Typography sx={{ fontSize: { xs: '1rem', md: '1.2rem', lg: '1.3rem' } }} fontWeight={700} gutterBottom>
                            {name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ display: { xs: 'none', md: 'inherit' } }}>
                            {category}
                        </Typography>
                        <Typography variant="h6" color="primary" sx={{ mt: { sm: 0.5, md: 1.5 }, display: { xs: 'none', md: 'inherit' } }}>
                            ${price}
                        </Typography>
                        <Stack direction={'row'} spacing={2} alignItems={'center'}>
                            <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'inherit', md: 'none' } }}>
                                {category}
                            </Typography>
                            <Typography variant="body1" color="primary" sx={{ mt: 0.5, display: { xs: 'inherit', md: 'none' } }}>
                                ${price}
                            </Typography>
                        </Stack>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, mt: { xs: 0.5, md: 2 }, alignItems: 'center' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            sx={{ alignSelf: "flex-start", display: { xs: 'none', md: 'block' } }}
                            onClick={handleAdd}
                        >
                            Agregar al carrito
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            sx={{ alignSelf: "flex-start", display: { xs: 'block', md: 'none' } }}
                            onClick={handleAdd}
                        >
                            <ShoppingCartIcon size='small' />
                        </Button>
                        <FavoriteButton product={product} />
                    </Box>
                    {
                        stockAvaiable == 0
                            ? (
                                <Alert sx={{ mt: 1 }} severity='error'>Sin stock</Alert>
                            )
                            : ''
                    }
                </CardContent>
            </Card>
        </Grid>
    );
};


export default ProductCard;