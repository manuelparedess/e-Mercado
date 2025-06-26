import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import { ProductContext } from '../../context/ProductContext';

import { Box, TextField, Button, Typography, Grid } from '@mui/material';
import Swal from 'sweetalert2';


const RegisterPage = () => {

    const { handleRegister, error, setError } = useContext(AuthContext);
    const { handleClearCart } = useContext(ProductContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: 'error',
                title: error,
                confirmButtonColor: '#1f8946',
            });
            setError(false);
        }
    }, [error]);

    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleClearCart();
        const success = await handleRegister(formData);
        if (success) navigate('/');
    };

    return (
        <Box
            sx={{
                minHeight: '100dvh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#1f8946',
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'center' }} component={Link} to="/" >
                <Box
                    component="img"
                    src='/logo.png'
                    mx={3}
                    sx={{
                        width: { xs: 300, md: 350, lg: 400 },
                        height: 'auto',
                        borderRadius: 2,
                    }}
                />
            </Box>
            <Box className='animate__animated animate__fadeIn animate__faster' sx={{ width: { xs: '90vw', sm: '75vw' , md: '50vw' }, mx: 'auto', mt: 3, p: 3, pt: 2, background: '#ffffff', boxShadow: '20' }}>
                <Typography className='ff-noto-sans' sx={{ mb: { xs: 2, md: 4}, fontWeight: 'bold', color: '#1f8946', fontSize: {xs: '1.75rem' ,md: '2.5rem', xl: '3rem'}, textAlign: 'center' }}>
                    Crea una cuenta
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ width: {xs: '100%', sm: '90%',md: '85%', xl: '80%'}, mx: 'auto' }}
                >
                    <Grid container sx={{ justifyContent: {lg: 'space-between', xl: 'space-around'}, mb: { xs: 0, lg: 2} }}>
                        <Grid item size={{ xs: 12, lg: 5 }}>
                            <Typography className='ff-noto-sans' sx={{ mb: 1, color: '#1f8946' }}>
                                Nombre:
                            </Typography>
                            <TextField
                                sx={{ mb: 2 }}
                                fullWidth
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Ingresa tu nombre"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item size={{ xs: 12, lg: 6, xl: 5 }}>
                            <Typography className='ff-noto-sans' sx={{ mb: 1, color: '#1f8946' }}>
                                Apellido:
                            </Typography>
                            <TextField
                                sx={{ mb: 2 }}
                                fullWidth
                                name="lastname"
                                type="text"
                                value={formData.lastname}
                                onChange={handleChange}
                                placeholder="Ingresa tu apellido"
                                variant="standard"
                            />
                        </Grid>
                    </Grid>
                    <Grid container sx={{ justifyContent: 'space-around' }}>
                        <Grid item size={{ xs: 12, xl: 11 }}>
                            <Typography className='ff-noto-sans' sx={{ mb: 1, color: '#1f8946' }}>
                                E-mail:
                            </Typography>
                            <TextField
                                sx={{ mb: 2 }}
                                fullWidth
                                name="email"
                                type="text"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Ingresa tu correo"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item size={{ xs: 12, xl: 11 }}>
                            <Typography className='ff-noto-sans' sx={{ mb: 1, color: '#1f8946' }}>
                                Contraseña:
                            </Typography>
                            <TextField
                                sx={{ mb: 2 }}
                                fullWidth
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Ingresa tu contraseña"
                                variant="standard"
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, backgroundColor: '#1f8946', '&:hover': { backgroundColor: '#166b37' }, width: { xs: '100%', lg: '50%'} }}
                        >
                            Registrate
                        </Button>
                    </Box>
                    <Typography className='ff-noto-sans' sx={{ mt: 3, color: '#1f8946', textAlign: 'center', fontSize: { xs: '1rem', lg: '1.25rem'} }}>
                        ¿Tienes una cuenta? <Link to={'/login'}>Inicia Sesion</Link>
                    </Typography>
                </Box>
            </Box>

        </Box>
    );
};

export default RegisterPage;