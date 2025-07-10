import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";

import QuantityCounter from "../../components/common/QuantityCounter";
import CartModal from "../../components/modules/CartModal";

import { Box, Typography, Divider, Grid, Button, Paper, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const CartPage = () => {

    const { cart, handleRemoveInCart } = useContext(ProductContext);
    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    return (
        <Box sx={{ maxWidth: 1000, mx: { xs: 0, sm: "auto" }, pt: 4, px: { xs: 1, sm: 4 }, height: '100dvh'}}>
            <Typography className='ff-noto-sans' variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#1f8946', textAlign: { xs: 'center', md: 'left' } }}>
                Carrito de Compras
            </Typography>
            <Divider sx={{ mb: 4, borderColor: 'primary.main' }} />

            {cart.length === 0 ? (
                <Typography variant="h6" color="text.secondary">
                    Tu carrito está vacío.
                </Typography>
            ) : (
                <>
                    <Grid container spacing={3}>
                        {cart.map((item) => (
                            <Grid item size={12} key={item.product._id} >
                                <Paper sx={{ p: 2, display: "flex", alignItems: "center", position: {xs: 'relative', sm: 'static'} }}>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleRemoveInCart(item.product._id)}
                                        sx={{
                                            display: {xs: 'block', sm: 'none'},
                                            position: "absolute",
                                            top: 8,
                                            right: 8,
                                            color: 'error.main',
                                            backgroundColor: 'rgba(255,255,255,0.8)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(255,255,255,1)',
                                            }
                                        }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                    <Box
                                        onClick={() => navigate(`/product/${item.product._id}`)}
                                        component="img"
                                        src={item.product.images[0]}
                                        alt={item.product.name}
                                        sx={{ width: {xs: 80, sm: 100}, height: 100, objectFit: "cover", borderRadius: 2, mr: 2, cursor: 'pointer' }}
                                    />
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography sx={{ fontSize: { xs: '1.1rem', md: '1.2rem', lg: '1.4rem' }, mb: 0 }}>{item.product.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Cantidad: {item.quantity} x ${item.product.price}
                                        </Typography>
                                        <Typography sx={{display: {xs: 'none', sm: 'inherit'}}} variant="body1" fontWeight={600}>
                                            Subtotal: ${(item.product.price * item.quantity).toFixed(2)}
                                        </Typography>
                                        <Typography sx={{display: {xs: 'inherit', sm: 'none'}}} variant="body2" fontWeight={600}>
                                            Subtotal: ${(item.product.price * item.quantity).toFixed(2)}
                                        </Typography>
                                    </Box>
                                    <QuantityCounter initial={item.quantity} product={item.product} />
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        sx={{ ml: { sm: 1, md: 3 }, display: { xs: 'none', sm: 'block' } }}
                                        onClick={() => handleRemoveInCart(item.product._id)}
                                    >
                                        Eliminar
                                    </Button>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>

                    <Box mt={4} display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
                        <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
                            Finalizar compra
                        </Button>
                    </Box>
                    <CartModal openModal={openModal} setOpenModal={setOpenModal} />
                </>
            )}
        </Box>
    );
};

export default CartPage;