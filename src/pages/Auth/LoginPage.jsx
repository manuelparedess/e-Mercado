import React, { useContext, useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Divider,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ProductContext } from '../../context/ProductContext';

const LoginPage = () => {

    const { handleLogin, error } = useContext(AuthContext);
    const { handleClearCart } = useContext(ProductContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
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
        const success = await handleLogin(formData);
        if (success) navigate('/');
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
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
                        width: 350,
                        height: 'auto',
                        borderRadius: 2,
                    }}
                />
            </Box>
            <Box className='animate__animated animate__fadeIn animate__faster' sx={{ width: '45vw', display: 'flex', justifyContent: 'space-between', mx: 'auto', mt: 4, p: 3, background: '#ffffff', boxShadow: '20' }}>
                <Box sx={{ width: '40%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', mx: 'auto' }}>
                    <Typography className='ff-noto-sans' variant="h5" sx={{ fontWeight: 'bold', color: '#1f8946' }}>
                        Ingresa tu e-mail y contraseña para iniciar sesión
                    </Typography>
                    <Typography className='ff-noto-sans' variant="h6" sx={{ color: '#1f8946' }}>
                        Si no tienes una cuenta <Link to={'/register'}>registrate aqui</Link>
                    </Typography>
                </Box>

                <Box sx={{ width: '45%', mx: 'auto' }}>
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
                        {
                            error
                                ? <Typography className='ff-noto-sans' sx={{ mt: 1, color: 'red' }}>
                                    {error}
                                </Typography>
                                : ''
                        }

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
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 1,
                            backgroundColor: '#fff',
                            color: '#000',
                            border: '1px solid #ccc',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: '#f5f5f5',
                            },
                        }}
                    >
                        <Box
                            component="img"
                            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                            alt="Google logo"
                        />
                        <Typography sx={{ ml: 1 }}>Iniciar sesion con Google</Typography>
                    </Button>
                </Box>
            </Box>

        </Box>
    );
};

export default LoginPage;