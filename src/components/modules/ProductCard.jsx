import React, { useContext, useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import Swal from 'sweetalert2';
import FavoriteButton from '../common/FavoriteButton';
import { AuthContext } from '../../context/AuthContext';

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
        if(user === null) {
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
        <Card
            onClick={() => navigate(`/product/${product._id}`)}
            sx={{
                width: 300,
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
                boxShadow: 3,
                overflow: "hidden",
                cursor: 'pointer',
                mb: 3
            }}
        >
            <CardMedia
                component="img"
                src={`http://localhost:5000${images[0]}`}
                alt={name}
                sx={{
                    height: 160,
                    objectFit: "cover",
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
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                        {name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        {category}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ mt: 1.5 }}>
                        ${price}
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, mt: 2, alignItems: 'center' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{alignSelf: "flex-start" }}
                        onClick={handleAdd}
                    >
                        Agregar al carrito
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
    );
};


export default ProductCard;