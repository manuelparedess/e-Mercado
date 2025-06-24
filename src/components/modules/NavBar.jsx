import React, { useContext } from 'react';
import {
    AppBar,
    Toolbar,
    Box,
    IconButton,
    Badge,
    Button,
    Divider,
    Avatar
} from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import NavTabs from '../common/NavTabs.jsx';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext.jsx';
import { UserContext } from '../../context/UserContext.jsx';

const NavBar = () => {

    const { user, handleLogout } = useContext(AuthContext);
    const { favorites } = useContext(UserContext);
    const { cart } = useContext(ProductContext);

    return (
        <AppBar position="static" sx={{ backgroundColor: '#1f8946' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                        component="img"
                        src="/logo.png"
                        alt="Descripción de la imagen"
                        mx={3}
                        sx={{
                            width: 200,
                            height: 'auto',
                            borderRadius: 2,
                        }}
                    />
                    <NavTabs />
                </Box>
                {
                    user
                        ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <IconButton component={Link} to="/user/favorites" color="inherit">
                                    <Badge badgeContent={favorites.length} color="error">
                                        <FavoriteIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton component={Link} to="/cart" color="inherit">
                                    <Badge badgeContent={cart.length} color="error">
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton component={Link} to="/help" color="inherit">
                                    <HelpOutlineIcon />
                                </IconButton>
                                <Divider orientation="vertical" flexItem sx={{ borderColor: '#0f6e33' }} />
                                <IconButton component={Link} to="/user/me" color="inherit">
                                    <Avatar sx={{ bgcolor: '#0f6e33'}}>
                                        {
                                            user.name && user.lastname
                                                ? `${user.name[0]}${user.lastname[0]}`.toUpperCase()
                                                : `${user.email[0]}${user.email[1]}`.toUpperCase()
                                        }
                                    </Avatar>
                                </IconButton>
                                <IconButton color="inherit" onClick={handleLogout} fontSize="large" sx={{ color: 'red', '&:hover': {cursor: 'pointer'}}}>
                                    <ExitToAppIcon />
                                </IconButton>
                            </Box>
                        )
                        : (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AccountCircleIcon fontSize='large' />
                                <Button
                                    component={Link}
                                    to="/login"
                                    sx={{
                                        ml: 1,
                                        color: '#fff', // letras blancas
                                        border: '1px solid #fff',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        },
                                    }}
                                >
                                    Iniciar sesión
                                </Button>
                                <IconButton sx={{ml: 1}} component={Link} to="/help" color="inherit">
                                    <HelpOutlineIcon />
                                </IconButton>
                            </Box>
                        )
                }

            </Toolbar>
        </AppBar>
    );
}

export default NavBar;





// agregar dropdown o en su defecto una tab de categorias y una categorypage
// agregar un buscador
//separar componentes como la tabs 