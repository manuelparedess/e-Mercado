import React, { useContext, useState } from 'react';
import { ProductContext } from '../../context/ProductContext';
import PaymentForm from '../common/PaymentForm';

import { Box, Typography, Divider, Button, Modal, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import Swal from 'sweetalert2';


const CartModal = ({ openModal, setOpenModal }) => {

    const { cart, handleClearCart, handleUpdateStock } = useContext(ProductContext);

    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const [paymentMethod, setPaymentMethod] = useState("card");

    const confirmPurchase = async () => {
        setOpenModal(false);
        Swal.fire({
            icon: 'success',
            title: '¡Compra realizada!',
            text: 'Gracias por tu compra.',
            confirmButtonColor: '#1f8946',
        });
        await handleUpdateStock();
        handleClearCart();
    };

    return (
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: '100vw', sm: 400 },
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    borderRadius: 2,
                    p: 4,
                }}
            >
                <Typography className='ff-noto-sans' variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: '#1f8946' }}>
                    Confirmación de Compra
                </Typography>
                <Divider sx={{ mb: 2, borderColor: 'primary.main' }} />
                {cart.map((item) => (
                    <Box key={item.product._id} sx={{ mb: 1 }}>
                        <Typography>
                            {item.product.name} x {item.quantity} = ${(item.product.price * item.quantity).toFixed(2)}
                        </Typography>
                    </Box>
                ))}
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
                <FormControl fullWidth sx={{ my: 2 }}>
                    <InputLabel>Método de Pago</InputLabel>
                    <Select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        label="Método de Pago"
                    >
                        <MenuItem value="card">Tarjeta de crédito / débito</MenuItem>
                        <MenuItem value="mercadopago">Mercado Pago</MenuItem>
                    </Select>
                </FormControl>

                {paymentMethod === "card" && (
                    <PaymentForm confirmPurchase={confirmPurchase} setOpenModal={setOpenModal} />
                )}

                {paymentMethod === "mercadopago" && (
                    <Box mt={3}>
                        <Button fullWidth onClick={() => setOpenModal(false)} variant="outlined" color="error" sx={{ mb: 2 }}>
                            Cancelar
                        </Button>
                        <Button
                            fullWidth
                            onClick={() => {
                                window.open("https://link.mercadopago.com.uy/emercado", "_blank");
                                confirmPurchase();
                            }}
                            variant="contained"
                            color="primary"
                        >
                            Pagar con Mercado Pago
                        </Button>
                    </Box>
                )}

            </Box>
        </Modal >
    )
}

export default CartModal