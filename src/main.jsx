import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';

//styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import './style/index.css';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './style/theme.js';

//router
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.jsx';

//context
import { AuthProvider } from './context/AuthContext.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { ProductProvider } from './context/ProductContext.jsx';

createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId="309826722787-7q2118h6vtqjl0a09i0j5lt1mab2iiac.apps.googleusercontent.com">
        <AuthProvider>
            <UserProvider>
                <ProductProvider>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <RouterProvider router={router} />
                    </ThemeProvider>
                </ProductProvider>
            </UserProvider>
        </AuthProvider>
    </GoogleOAuthProvider>
)