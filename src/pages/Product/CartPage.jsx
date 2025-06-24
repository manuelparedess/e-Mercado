import React, { useContext, useState } from "react";
import {
    Box,
    Typography,
    Divider,
    Grid,
    Button,
    Paper,
} from "@mui/material";
import { ProductContext } from "../../context/ProductContext";
import QuantityCounter from "../../components/common/QuantityCounter";
import CartModal from "../../components/modules/CartModal";
import { useNavigate } from "react-router-dom";

const CartPage = () => {

    const { cart, handleRemoveInCart } = useContext(ProductContext);
    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0 );

    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    return (
        <Box sx={{ maxWidth: 1000, mx: "auto", p: 4 }}>
            <Typography className='ff-noto-sans' variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#1f8946' }}>
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
                            <Grid item size={12} key={item.product._id}>
                                <Paper sx={{ p: 2, display: "flex", alignItems: "center" }}>
                                    <Box
                                        onClick={() => navigate(`/product/${item.product._id}`)}
                                        component="img"
                                        src={`https://e-mercado.onrender.com${item.product.images[0]}`}
                                        alt={item.product.name}
                                        sx={{ width: 100, height: 100, objectFit: "cover", borderRadius: 2, mr: 2, cursor: 'pointer' }}
                                    />
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6">{item.product.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Cantidad: {item.quantity} x ${item.product.price}
                                        </Typography>
                                        <Typography variant="body1" fontWeight={600}>
                                            Subtotal: ${(item.product.price * item.quantity).toFixed(2)}
                                        </Typography>
                                    </Box>
                                    <QuantityCounter initial={item.quantity} product={item.product} />
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        sx={{ml: 3}}
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