import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";
import { ProductContext } from "../../context/ProductContext";

import ImageCarrousel from '../../components/common/ImageCarrousel';
import FavoriteButton from "../../components/common/FavoriteButton";
import Reviews from "../../components/modules/Reviews";

import Swal from 'sweetalert2';
import { Box, Typography, Button, Grid, Stack } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const ProductDetailsPage = () => {

    //autoscroll
    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, []);

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    //product
    const { product } = useLoaderData();
    const { images, name, price, category, stock, description } = product;
    const { cart, handleAddToCart } = useContext(ProductContext);
    const [stockAvaiable, setStockAvaiable] = useState(stock);

    useEffect(() => {
        if (cart.find(p => p.product._id === product._id)) {
            setStockAvaiable(stockAvaiable - cart.find(p => p.product._id === product._id).quantity)
        }

    }, []);

    //creator
    const { handleGetUserById } = useContext(UserContext);
    const [creator, setCreator] = useState({});

    useEffect(() => {
        (async () => {
            const userCreator = await handleGetUserById(product.createdBy.user);
            setCreator(userCreator);
        })()
    }, [product]);

    if (!product) {
        return <Typography variant="h6">Producto no encontrado.</Typography>;
    }

    //cart
    const handleAdd = () => {
        if (user === null) {
            navigate('/login');
            return;
        };
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
            setStockAvaiable(stockAvaiable - 1);
        }
    }

    return (
        <Box sx={{ py: 4, px: { xs: 2, lg: 4 }, maxWidth: 1200, mx: "auto" }}>
            <Grid container spacing={4} sx={{ backgroundColor: '#fff', boxShadow: 2, p: 2, borderRadius: 2, justifyContent: 'center' }}>
                {/* Carrousel */}
                <Grid className="animate__animated animate__backInLeft" item size={{ xs: 12, md: 5, lg: 6 }}>
                    <ImageCarrousel images={images} />
                </Grid>

                <Grid className="animate__animated animate__backInRight" item size={{ xs: 12, md: 7, lg: 6 }} sx={{ p: 4, border: '1px solid rgb(227, 227, 227)', borderRadius: 5 }}>
                    <Typography sx={{ fontSize: { xs: '1.25rem', sm: '1.75rem', lg: '2.15rem' } }} fontWeight={700} gutterBottom>
                        {name}
                    </Typography>

                    <Typography variant="body1" color="text.secondary" paragraph>
                        {description}
                    </Typography>

                    <Typography variant="body2" gutterBottom>
                        Categoría: <strong>{category}</strong>
                    </Typography>

                    <Typography variant="body2" gutterBottom>
                        Stock disponible: <strong>{stockAvaiable}</strong>
                    </Typography>
                    {creator.user ? (
                        <Typography variant="body2" gutterBottom>
                            Creador: <Link to={`/user/${creator.user.id}`}>{creator.user.name} {creator.user.lastname}</Link>
                        </Typography>
                    ) : (
                        <Typography variant="body2" gutterBottom>
                            Cargando creador...
                        </Typography>
                    )}

                    <Typography variant="h5" color="primary" sx={{ display: { xs: 'none', md: 'inherit' }, my: 2 }}>
                        ${price}
                    </Typography>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                        <Button variant="contained" color="primary" size="large" onClick={handleAdd}>
                            Agregar al carrito
                        </Button>
                        <FavoriteButton product={product} />
                    </Box>

                    <Stack direction={'row'} justifyContent={'space-between'} sx={{ display: { xs: 'flex', md: 'none' }, mt: 2 }}>
                        <Typography variant="h5" color="primary">
                            ${price}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={handleAdd}
                            >
                                <ShoppingCartIcon size='small' />
                            </Button>
                            <FavoriteButton product={product} />
                        </Box>
                    </Stack>

                </Grid>
            </Grid>

            <Reviews product={product} />
        </Box>
    );
};

export default ProductDetailsPage;