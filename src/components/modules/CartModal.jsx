import React, { useContext } from 'react'
import {
    Box,
    Typography,
    Divider,
    Button,
    Modal,
} from "@mui/material";
import Swal from 'sweetalert2';
import { ProductContext } from '../../context/ProductContext';

const CartModal = ({ openModal, setOpenModal }) => {
    const { cart, handleClearCart, handleUpdateStock } = useContext(ProductContext);
    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const confirmPurchase = async() => {
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
                    width: 400,
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
                <Box mt={3} display="flex" justifyContent="space-between">
                    <Button onClick={() => setOpenModal(false)} variant="outlined" color='error'>
                        Cancelar
                    </Button>
                    <Button onClick={confirmPurchase} variant="contained" color="primary">
                        Confirmar
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default CartModal