import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ProductContext } from "../../context/ProductContext";

import { Card, CardMedia, CardContent, Typography, Button, Stack, Alert, Box, Grid } from "@mui/material";
import FavoriteButton from "../common/FavoriteButton";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Swal from 'sweetalert2';


const ProductResult = ({ product }) => {

    const { images, name, price, category, stock, description } = product;

    const { cart, handleAddToCart } = useContext(ProductContext);
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
        <Grid item size={{ xs: 12, lg: 6 }}>
            <Card
                onClick={() => navigate(`/product/${product._id}`)}
                sx={{
                    height: '100%',
                    display: "flex",
                    flexDirection: "row",
                    alignItems: {xs: 'center', md: "flex-start"},
                    p: 2,
                    px: {xs: 0.5, sm: 2},
                    borderRadius: 3,
                    boxShadow: 2,
                    cursor: 'pointer'
                }}
            >
                <CardMedia
                    component="img"
                    src={`https://e-mercado.onrender.com${images[0]}`}
                    alt={name}
                    sx={{
                        width: { xs: 110, sm: 150, xl: 160 },
                        height: { xs: 110, sm: 150, xl: 160 },
                        objectFit: "cover",
                        borderRadius: 2,
                    }}
                />

                <CardContent sx={{ flex: 1, ml: 3, p: 0 }}>
                    <Typography sx={{ fontSize: { xs: '1.1rem', md: '1.2rem', lg: '1.3rem' }, mb: 0 }} fontWeight={700} gutterBottom>
                        {name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{mb: {xs: 0.5, sm: 1.5}}}>
                        {description}
                    </Typography>

                    <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: { xs: 0.5, sm: 1} }}>
                        <Typography variant="body2" color="text.secondary">
                            Categoría: <strong>{category}</strong>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Stock: <strong>{stockAvaiable}</strong>
                        </Typography>
                        <Typography variant="h6" color="primary" sx={{ display: { xs: 'none', lg: 'flex', xl: 'none' } }}>
                            ${price}
                        </Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ display: { xs: 'flex', lg: 'none', xl: 'flex' } }}>
                        <Typography variant="h6" color="primary">
                            ${price}
                        </Typography>
                        <Box sx={{ display: {xs: 'none', sm: 'flex'}, gap: 1 }}>
                            <FavoriteButton product={product} />
                            <Button variant="contained" color="primary" onClick={handleAdd}>
                                Agregar al carrito
                            </Button>
                        </Box>
                    </Stack>
                    <Box sx={{ display: { xs: 'flex', sm: 'none', lg: 'flex', xl: 'none' }, gap: 1, mt: {xs: 1, sm: 0} }}>
                        <Button variant="contained" color="primary" onClick={handleAdd} sx={{ display: { xs: 'none', sm: 'flex'}}}>
                            Agregar al carrito
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            sx={{ alignSelf: "flex-start", display: { xs: 'flex', sm: 'none' }} }
                            onClick={handleAdd}
                        >
                            <ShoppingCartIcon size='small' />
                        </Button>
                        <FavoriteButton product={product} />
                    </Box>
                    {
                        stockAvaiable == 0
                            ? (
                                <Alert severity='error'>Sin stock</Alert>
                            )
                            : ''
                    }
                </CardContent>
            </Card>
        </Grid>
    );
};

export default ProductResult;