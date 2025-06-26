import React, { useState } from 'react';
import { createProduct } from '../../api/product/createProduct';
import InputImage from '../../components/common/InputImage';

import { Box, TextField, Button, MenuItem, InputLabel, Select, FormControl, Typography, Divider, Alert } from '@mui/material';
import Swal from 'sweetalert2';


const SellPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        category: '',
        stock: 0,
        images: [],
    });

    const [validation, setValidation] = useState({
        name: false,
        price: false,
        category: false,
        stock: false,
        images: false,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleValidation = () => {
        const newValidation = {
            name: formData.name.trim().length === 0,
            price: formData.price === 0 || formData.price.toString().trim() === '',
            category: formData.category.trim().length === 0,
            stock: formData.stock === 0 || formData.stock.toString().trim() === '',
            images: formData.images.length === 0,
        };

        setValidation(newValidation);

        return Object.values(newValidation).some((v) => v === true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const error = handleValidation();
        if (error) {
            return;
        }

        try {
            await createProduct(formData);
            
        } catch (error) {
            console.log(error);
        }
        Swal.fire({
            icon: 'success',
            title: '¡Producto creado!',
            confirmButtonColor: '#1f8946',
        });
        setFormData({
            name: '',
            description: '',
            price: 0,
            category: '',
            stock: 0,
            images: [],
        })
    };

    return (
        <Box className='animate__animated animate__fadeIn animate__faster' sx={{ maxWidth: 600, mx: {xs: 1.5, sm: 'auto'}, mt: 4, p: 3, borderRadius: '15px', boxShadow: '15', backgroundColor: '#fff' }}>

            <Typography className='ff-noto-sans' variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#1f8946',  }}>
                Nuevo Producto
            </Typography>
            <Divider sx={{ borderColor: 'primary.main' }} />

            <form onSubmit={handleSubmit}>
                <TextField
                    error={validation.name}
                    sx={{ mt: 2 }}
                    fullWidth
                    label="Nombre del producto"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Descripción"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    margin="normal"
                />

                <TextField
                    error={validation.price}
                    fullWidth
                    label="Precio"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    margin="normal"
                />

                <FormControl error={validation.category} fullWidth margin="normal">
                    <InputLabel>Categoría</InputLabel>
                    <Select
                        name="category"
                        value={formData.category}
                        label="Categoría"
                        onChange={handleChange}
                    >
                        <MenuItem value="Tecnología">Tecnología</MenuItem>
                        <MenuItem value="Ropa">Ropa</MenuItem>
                        <MenuItem value="Calzado">Calzado</MenuItem>
                        <MenuItem value="Vehiculos">Vehiculos</MenuItem>
                        <MenuItem value="Accesorios">Accesorios</MenuItem>
                        <MenuItem value="Hogar">Hogar</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    error={validation.stock}
                    fullWidth
                    label="Stock"
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleChange}
                    margin="normal"
                />

                <InputImage formData={formData} setFormData={setFormData} limit={5} />
                {validation.images
                    ? (
                        <Alert severity='error'>Debe tener al menos una imagen</Alert>
                    )
                    : ''
                }

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 3 }}
                >
                    Publicar Producto
                </Button>
            </form>
        </Box>
    );
}


export default SellPage;
