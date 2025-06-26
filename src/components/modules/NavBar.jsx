import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//context
import { AuthContext } from '../../context/AuthContext';
import { ProductContext } from '../../context/ProductContext.jsx';
import { UserContext } from '../../context/UserContext.jsx';

//components
import NavTabs from '../common/NavTabs.jsx';
import MenuMobile from '../common/MenuMobile.jsx';
//style
import { useTheme, useMediaQuery, AppBar, Toolbar, Box, IconButton, Badge,
    Button, Divider, Avatar, Grid, TextField, InputAdornment
} from '@mui/material';
//icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';

const NavBar = () => {

    //style
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
    const [openDrawer, setOpenDrawer] = useState(false);

    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const { user, handleLogout } = useContext(AuthContext);
    const { favorites } = useContext(UserContext);
    const { cart } = useContext(ProductContext);

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim().length != 0) navigate(`/product?q=${encodeURIComponent(search)}`);
    }

    return (
        <AppBar position="static" sx={{ backgroundColor: '#1f8946' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                {
                    isDesktop
                        ? (
                            <>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box
                                        component="img"
                                        src="/logo.png"
                                        alt="Descripción de la imagen"
                                        mx={3}
                                        sx={{
                                            width: { lg: 200, xl: 230 },
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
                                                    <Avatar sx={{ bgcolor: '#0f6e33' }}>
                                                        {
                                                            user.name && user.lastname
                                                                ? `${user.name[0]}${user.lastname[0]}`.toUpperCase()
                                                                : `${user.email[0]}${user.email[1]}`.toUpperCase()
                                                        }
                                                    </Avatar>
                                                </IconButton>
                                                <IconButton color="inherit" onClick={handleLogout} fontSize="large" sx={{ color: 'red', '&:hover': { cursor: 'pointer' } }}>
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
                                                <IconButton sx={{ ml: 1 }} component={Link} to="/help" color="inherit">
                                                    <HelpOutlineIcon />
                                                </IconButton>
                                            </Box>
                                        )
                                }
                            </>
                        )
                        : (
                            <Grid container sx={{ width: '100%' }} >
                                <Grid item size={{ xs: 1, md: 4 }}>
                                    <IconButton
                                        color="inherit"
                                        sx={{ mr: 1 }}
                                        onClick={() => setOpenDrawer(true)}
                                    >
                                        <MenuIcon fontSize='large' />
                                    </IconButton>
                                    <Box
                                        component="img"
                                        src="/logo.png"
                                        alt="Logo"
                                        sx={{
                                            width: '70%',
                                            objectFit: 'contain',
                                            display: { xs: 'none', md: 'inline' }
                                        }}
                                    />
                                </Grid>
                                <Grid item size={{ xs: 10, md: 7 }} sx={{ px: 3, display: 'flex', alignItems: 'center' }}>
                                    <form className='nav-form' onSubmit={handleSearch}>
                                        <TextField
                                            size='small'
                                            onChange={(e) => setSearch(e.target.value)}
                                            placeholder="Ej. zapatillas, auriculares..."
                                            variant="outlined"
                                            fullWidth
                                            sx={{
                                                backgroundColor: 'white',
                                                input: { color: 'black' },
                                                borderRadius: 2,
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: 'primary.main',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: 'black',
                                                    },
                                                }
                                            }
                                            }
                                            slotProps={{
                                                input: {
                                                    startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>,
                                                },
                                            }}
                                        />
                                    </form>
                                </Grid>
                                <Grid item size={{ xs: 1 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    {
                                        user
                                            ? (
                                                <>
                                                    <IconButton component={Link} to="/user/me" color="inherit">
                                                        <Avatar sx={{ bgcolor: '#0f6e33' }}>
                                                            {
                                                                user.name && user.lastname
                                                                    ? `${user.name[0]}${user.lastname[0]}`.toUpperCase()
                                                                    : `${user.email[0]}${user.email[1]}`.toUpperCase()
                                                            }
                                                        </Avatar>
                                                    </IconButton>
                                                </>
                                            )
                                            : (
                                                <IconButton component={Link} to="/user/me" color="inherit">
                                                    <AccountCircleIcon fontSize='large' />
                                                </IconButton>
                                            )
                                    }
                                </Grid>
                                <MenuMobile openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
                            </Grid>
                        )
                }

            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
