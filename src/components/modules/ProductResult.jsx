import React, { useContext, useEffect, useState } from "react";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    Stack,
    Alert,
    Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import Swal from 'sweetalert2';
import FavoriteButton from "../common/FavoriteButton";
import { AuthContext } from "../../context/AuthContext";

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
                width: '45%',
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                p: 2,
                borderRadius: 3,
                boxShadow: 2,
                mb: 3,
                cursor: 'pointer'
            }}
        >
            <CardMedia
                component="img"
                src={`http://localhost:5000${images[0]}`}
                alt={name}
                sx={{
                    width: 160,
                    height: 160,
                    objectFit: "cover",
                    borderRadius: 2,
                }}
            />

            <CardContent sx={{ flex: 1, ml: 3, p: 0 }}>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                    {name}
                </Typography>

                <Typography variant="body2" color="text.secondary" paragraph>
                    {description}
                </Typography>

                <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                        Categoría: <strong>{category}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Stock: <strong>{stockAvaiable}</strong>
                    </Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" color="primary">
                        ${price}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <FavoriteButton product={product} />
                        <Button variant="contained" color="primary" onClick={handleAdd}>
                            Agregar al carrito
                        </Button>
                    </Box>
                </Stack>
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

export default ProductResult;