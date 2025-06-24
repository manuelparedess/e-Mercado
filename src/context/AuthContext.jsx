import { useState, createContext, useEffect } from 'react';
import { login } from '../api/auth/login';
import { getUser } from '../api/user/getUser';

import { Box, CircularProgress } from '@mui/material';
import { register } from '../api/auth/register';
import { loginWithGoogle } from '../api/auth/loginWithGoogle';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
	const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);

	//relogin
	useEffect(() => {
		//Hago una funcion IFE para que sea asincrono
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
        setReload,
        handleLogin,
        handleLoginWithGoogle,
        handleRegister,
        handleLogout
    };


    if (loading) return (
        <Box
            sx={{
                minHeight: '100vh',
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

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
