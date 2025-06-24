import { createRoot } from 'react-dom/client'

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
)