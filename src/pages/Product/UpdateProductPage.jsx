import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { updateProduct } from '../../api/product/updateProduct';
import { deleteProductImage } from '../../api/product/deleteProductImage';

import InputImage from '../../components/common/InputImage';
import { Box, TextField, Button, MenuItem, InputLabel, Select, FormControl, Typography, Divider, Alert, Grid, Paper } from '@mui/material';
import Swal from 'sweetalert2';

const UpdateProductPage = () => {

    const { product } = useLoaderData();
    const navigate = useNavigate();

    const [productImages, setProductImages] = useState(product.images);

    const [formData, setFormData] = useState({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        stock: product.stock,
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
            images: formData.images.length === 0 && productImages.length === 0,
        };

        setValidation(newValidation);

        return Object.values(newValidation).some((v) => v === true);
    }

    const handleRemoveImage = async (index) => {
        const newImages = productImages.filter((_, i) => i !== index);
        await deleteProductImage(product._id, newImages);
        setProductImages(newImages);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const error = handleValidation();
        if (error) {
            return;
        }

        try {
            await updateProduct(product._id, formData);

        } catch (error) {
            console.log(error);
        }
        Swal.fire({
            icon: 'success',
            title: '¡Producto actualizado!',
            confirmButtonColor: '#1f8946',
        });
        navigate('/user/products');
    };

    return (
        <Box className='animate__animated animate__fadeIn animate__faster' sx={{ maxWidth: 600, mx: {xs: 1.5, sm: 'auto'}, mt: 4, p: 3, borderRadius: '15px', boxShadow: '15', backgroundColor: '#fff' }}>

            <Typography className='ff-noto-sans' variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#1f8946', textAlign: {xs: 'center', md: 'left'} }}>
                Editar Producto
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
                <Grid container spacing={2}>
                    {productImages.map((img, idx) => (
                        <Grid item xs={4} key={idx}>
                            <Paper
                                elevation={2}
                                sx={{
                                    position: 'relative',
                                    overflow: 'hidden',
                                    borderRadius: 2,
                                }}
                            >
                                <img
                                    src={`https://e-mercado.onrender.com${img}`}
                                    alt={`upload-${idx}`}
                                    style={{
                                        width: '100%',
                                        height: '100px',
                                        objectFit: 'cover',
                                    }}
                                />
                                <Button
                                    size="small"
                                    onClick={() => handleRemoveImage(idx)}
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        minWidth: 'unset',
                                        p: 0.5,
                                        fontSize: 10,
                                        color: 'white',
                                        backgroundColor: 'rgba(0,0,0,0.6)',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0,0,0,0.8)',
                                        },
                                    }}
                                >
                                    ✕
                                </Button>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                {/* New Images */}
                <Typography className='ff-noto-sans' sx={{ mt: 2, color: '#1f8946' }}>
                    Nuevas imagenes:
                </Typography>
                <InputImage formData={formData} setFormData={setFormData} limit={5 - productImages.length} />
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
                    Actualizar Producto
                </Button>
            </form>
        </Box>
    );
}


export default UpdateProductPage;