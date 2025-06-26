import React, { useContext, useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button,
    Grid,
} from "@mui/material";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import ImageCarrousel from '../../components/common/ImageCarrousel';
import { ProductContext } from "../../context/ProductContext";
import Swal from 'sweetalert2';
import FavoriteButton from "../../components/common/FavoriteButton";
import { UserContext } from "../../context/UserContext";
import { AuthContext } from "../../context/AuthContext";
import Reviews from "../../components/modules/Reviews";

const ProductDetailsPage = () => {

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

    //creador
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

    const handleAdd = () => {
        if(user === null) {
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
        <Box sx={{ py: 4, px: {xs: 2, lg: 4}, maxWidth: 1200, mx: "auto" }}>
            <Grid container spacing={4} sx={{ backgroundColor: '#fff', boxShadow: 2, p: 2, borderRadius: 2, justifyContent: 'center' }}>
                {/* Carrousel */}
                <Grid className="animate__animated animate__backInLeft" item size={{ md: 5, lg: 6}}>
                    <ImageCarrousel images={images} />
                </Grid>

                <Grid className="animate__animated animate__backInRight" item size={{ md: 7, lg: 6}} sx={{ p: 4, border: '1px solid rgb(227, 227, 227)', borderRadius: 5 }}>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
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

                    <Typography variant="h5" color="primary" sx={{ my: 2 }}>
                        ${price}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button variant="contained" color="primary" size="large" onClick={handleAdd}>
                            Agregar al carrito
                        </Button>
                        <FavoriteButton product={product} />
                    </Box>

                </Grid>
            </Grid>

            <Reviews product={product} />
        </Box>
    );
};

export default ProductDetailsPage;