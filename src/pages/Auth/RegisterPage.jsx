import React, { useContext, useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ProductContext } from '../../context/ProductContext';

const RegisterPage = () => {

    const { handleRegister, error } = useContext(AuthContext);
    const { handleClearCart } = useContext(ProductContext);
    const navigate = useNavigate();

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
                minHeight: '100vh',
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
                        width: 350,
                        height: 'auto',
                        borderRadius: 2,
                    }}
                />
            </Box>
            <Box className='animate__animated animate__fadeIn animate__faster' sx={{ width: '30vw', mx: 'auto', mt: 3, p: 3, pt: 2, background: '#ffffff', boxShadow: '20' }}>
                <Typography className='ff-noto-sans' variant='h4' sx={{ mb: 2, fontWeight: 'bold', color: '#1f8946' }}>
                    Crea una cuenta
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ width: '100%' }}
                >
                    <Box>
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
                    </Box>
                    <Box>
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
                    </Box>
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
                            variant="standard"
                        />
                    </Box>
                    <Box>
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
                        sx={{ mt: 3, backgroundColor: '#1f8946', '&:hover': { backgroundColor: '#166b37' } }}
                    >
                        Registrate
                    </Button>
                    <Typography className='ff-noto-sans' sx={{ mt: 2, color: '#1f8946' }}>
                        ¿Tienes una cuenta? <Link to={'/login'}>Inicia Sesion</Link>
                    </Typography>
                </Box>
            </Box>

        </Box>
    );
};

export default RegisterPage;