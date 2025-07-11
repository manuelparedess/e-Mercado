import { useState, createContext, useEffect } from 'react';

import { login } from '../api/auth/login';
import { getUser } from '../api/user/getUser';
import { register } from '../api/auth/register';
import { loginWithGoogle } from '../api/auth/loginWithGoogle';

import { Box, Button, CircularProgress, Typography } from '@mui/material';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
	const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);
    //timeout
    const [timeout, setTimeout] = useState(false);

	//relogin
	useEffect(() => {
		//IFE function
		(async () => {
			const token = localStorage.getItem('token');
            if(token) {
                await handleGetUser(token);
            }
			setLoading(false);
		})()

	}, [reload])

    //getUser
    const handleGetUser = async (token) => {
        try {
            const user = await getUser(token);
            delete user.password;
            setUser(user);

        } catch (error) {
            setUser(null);
            if (error.message === 'Timeout finished') {
                setTimeout(true);
            }
        }
    }

    //login
    const handleLogin = async (data) => {

        try {
            setError(false);
            const { token } = await login(data);
            localStorage.setItem('token', token);
            await handleGetUser(token);
            return true;
        } catch (error) {
            setError(error.msg);
            return false;
        }
    }

    //login with google
    const handleLoginWithGoogle = async (credential) => {
        try {
            setError(false);
            const { token } = await loginWithGoogle(credential);
            localStorage.setItem('token', token);
            await handleGetUser(token);
            return true;
        } catch (error) {
            setError(error.msg);
            return false;
        }
    }

    //register
    const handleRegister = async (data) => {
        try {
            setError(false);
			const res = await register(data);
            if(res) {
                await handleLogin(data)
            }
            return true;
		} catch (error) {
            setError(error.msg);
            return false;
		}
    }

    //logout
	const handleLogout = () => {
		localStorage.clear();
		setUser(null);
	}

    const data = {
        user,
        error,
        setUser,
        setError,
        setReload,
        handleLogin,
        handleLoginWithGoogle,
        handleRegister,
        handleLogout
    };


    if (loading) return (
        <Box
            sx={{
                minHeight: '100dvh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgb(227, 227, 227)',
            }}
        >
            <CircularProgress sx={{ color: '#1f8946' }} size={50} />
        </Box>
    );

    if (timeout) return (
        <Box
            sx={{
                minHeight: '100dvh',
                width: '100vw',
                display: 'flex',
                flexDirection: "column",
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#1f8946',
            }}
        >
            <Typography variant="h1" fontWeight={800} sx={{color: '#fff'}} gutterBottom>
                Ups...
            </Typography>
            <Typography variant="h5" sx={{color: '#fff', width: '50%'}} mb={3}>
                Lo siento, el servidor alojado en Render utiliza el plan gratuito, el cual se queda inactivo luego de un tiempo. Por favor, espere unos 30 segundos y vuelva a recargar para que la página se renderice.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => window.location.reload()}
                sx={{ mt: 2 }}
            >
                Recargar página
            </Button>
        </Box>
    );

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
