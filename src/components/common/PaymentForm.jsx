import React, { useState } from 'react';
import { TextField, Box, Button } from '@mui/material';

const PaymentForm = ({ confirmPurchase, setOpenModal }) => {
    const [formData, setFormData] = useState({
        cardNumber: '',
        cardHolder: '',
        expiry: '',
        cvv: '',
    });

    const [validation, setValidation] = useState({
        cardNumber: false,
        cardHolder: false,
        expiry: false,
        cvv: false,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setValidation({ ...validation, [e.target.name]: false });
    };

    const handleValidation = () => {
        const cardNumberRegex = /^\d{16}$/;
        const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        const cvvRegex = /^\d{3,4}$/;

        const newErrors = {
            cardNumber: !cardNumberRegex.test(formData.cardNumber),
            cardHolder: formData.cardHolder.trim().length === 0,
            expiry: !expiryRegex.test(formData.expiry),
            cvv: !cvvRegex.test(formData.cvv),
        };

        setValidation(newErrors);
        return Object.values(newErrors).some((e) => e === true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const error = handleValidation();
        if (error) {
            return;
        } else {
            confirmPurchase();s
        }
    };



    //Arreglar submit ver q hacer con el boton

    return (
        <>
            <TextField
                label="Número de tarjeta"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                error={validation.cardNumber}
                fullWidth
                sx={{ mb: 2 }}
                required
            />
            <TextField
                label="Titular"
                name="cardHolder"
                value={formData.cardHolder}
                onChange={handleChange}
                error={validation.cardHolder}
                fullWidth
                sx={{ mb: 2 }}
                required
            />
            <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                    label="Expira"
                    name="expiry"
                    placeholder="MM/AA"
                    value={formData.expiry}
                    onChange={handleChange}
                    error={validation.expiry}
                    fullWidth
                    required
                />
                <TextField
                    label="CVV"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    error={validation.cvv}
                    fullWidth
                    required
                />
            </Box>
            <Box mt={3} display={{ xs: 'none', sm: 'flex' }} justifyContent="space-between">
                <Button onClick={() => setOpenModal(false)} variant="outlined" color="error">
                    Cancelar
                </Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Pagar con Tarjeta
                </Button>
            </Box>
            <Box mt={3} display={{ xs: 'block', sm: 'none' }} justifyContent="space-between">
                <Button onClick={() => setOpenModal(false)} variant="outlined" color="error" fullWidth>
                    Cancelar
                </Button>
                <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth sx={{ mt: 1 }}>
                    Pagar con Tarjeta
                </Button>
            </Box>
        </>
    );
};

export default PaymentForm;