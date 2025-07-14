import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

import { AuthContext } from '../../context/AuthContext';
import { ProductContext } from '../../context/ProductContext';

import { Box, TextField, Button, Typography, Divider } from '@mui/material';
import Swal from 'sweetalert2';


const LoginPage = () => {

    const { handleLogin, handleLoginWithGoogle, error, setError } = useContext(AuthContext);
    const { handleClearCart } = useContext(ProductContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

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
        const success = await handleLogin(formData);
        if (success) navigate('/');
    };

    const handleGoogleLogin = (credentialResponse) => {
        handleClearCart();
        const success = handleLoginWithGoogle(credentialResponse.credential);
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
            <Box sx={{ display: 'flex', justifyContent: 'center' }} component={Link} to="/">
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
            <Box className='animate__animated animate__fadeIn animate__faster' sx={{ width: { md: '70vw', lg: '50vw', xl: '55vw' }, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-between', mx: 'auto', mt: 4, p: 3, px: { md: 1.5, xl: 3 }, background: '#ffffff', boxShadow: '20' }}>
                <Box sx={{ width: '42%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', mx: 'auto' }}>
                    <Typography className='ff-noto-sans' sx={{ fontWeight: 'bold', color: '#1f8946', fontSize: { md: '1.5rem', xl: '1.75rem' } }}>
                        Ingresa tu e-mail y contraseña para iniciar sesión
                    </Typography>
                    <Typography className='ff-noto-sans' sx={{ color: '#1f8946', fontSize: { md: '1.15rem', xl: '1.45rem' } }}>
                        Si no tienes una cuenta <Link to={'/register'}>registrate aqui</Link>
                    </Typography>
                </Box>

                <Box sx={{ width: { md: '52%', lg: '50%' }, mx: 'auto' }}>
                    <form onSubmit={handleSubmit}>
                        <Box>
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
                                variant="outlined"
                            />
                        </Box>

                        <Box>
                            <Typography className='ff-noto-sans' sx={{ mb: 1, color: '#1f8946' }}>
                                Contraseña:
                            </Typography>
                            <TextField
                                fullWidth
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Ingresa tu contraseña"
                                variant="outlined"
                            />
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ mt: 3 }}
                        >
                            Ingresar
                        </Button>
                        <Divider sx={{ mt: 1 }}>o</Divider>
                    </form>
                    <Box sx={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                        <GoogleLogin
                            onSuccess={(credentialResponse) => {
                                handleGoogleLogin(credentialResponse);
                            }}
                            onError={() => console.log('Login Failed')}
                        />
                    </Box>
                </Box>
            </Box>

            <Box className='animate__animated animate__fadeIn animate__faster' sx={{ width: { xs: '90vw', sm: '70vw' }, display: { xs: 'block', md: 'none' }, backgroundColor: '#fff', p: 2, mt: 3 }}>
                <Typography className='ff-noto-sans' sx={{ color: '#1f8946', fontSize: '2rem', fontWeight: 'bold', mb: 1, textAlign: 'center' }}>
                    Iniciar Sesion
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box>
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
                            variant="outlined"
                        />
                    </Box>

                    <Box>
                        <Typography className='ff-noto-sans' sx={{ mb: 1, color: '#1f8946' }}>
                            Contraseña:
                        </Typography>
                        <TextField
                            fullWidth
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Ingresa tu contraseña"
                            variant="outlined"
                        />
                    </Box>

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 3 }}
                    >
                        Ingresar
                    </Button>
                    <Divider sx={{ mt: 1 }}>o</Divider>
                </form>
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        handleGoogleLogin(credentialResponse);
                    }}
                    onError={() => console.log('Login Failed')}
                />
                <Typography className='ff-noto-sans' sx={{ color: '#1f8946', fontSize: '1rem', mt: 2, textAlign: 'center' }}>
                    Si no tienes una cuenta <Link to={'/register'}>registrate aqui</Link>
                </Typography>
            </Box>

        </Box>
    );
};

export default LoginPage;