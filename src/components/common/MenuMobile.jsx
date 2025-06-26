import React, { useContext, useState } from 'react'
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
    Drawer, List, ListItem, ListItemButton, ListItemText,
    Stack, Accordion,
    AccordionSummary,
    Typography,
    AccordionDetails,
    Collapse,
    Box,
    Button,
    IconButton,
    Badge,
    Divider
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom';

import DevicesIcon from "@mui/icons-material/Devices";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import WatchIcon from "@mui/icons-material/Watch";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../context/UserContext';
import { ProductContext } from '../../context/ProductContext';

const categories = [
    { name: "Tecnología", icon: <DevicesIcon fontSize="small" sx={{ color: '#fff', mr: 1 }} /> },
    { name: "Hogar", icon: <HomeIcon fontSize="small" sx={{ color: '#fff', mr: 1 }} /> },
    { name: "Calzado", icon: <DirectionsRunIcon fontSize="small" sx={{ color: '#fff', mr: 1 }} /> },
    { name: "Ropa", icon: <CheckroomIcon fontSize="small" sx={{ color: '#fff', mr: 1 }} /> },
    { name: "Accesorios", icon: <WatchIcon fontSize="small" sx={{ color: '#fff', mr: 1 }} /> },
    { name: "Vehiculos", icon: <DirectionsCarIcon fontSize="small" sx={{ color: '#fff', mr: 1 }} /> },
];


const MenuMobile = ({ openDrawer, setOpenDrawer }) => {

    const { user, handleLogout } = useContext(AuthContext);
    const { favorites } = useContext(UserContext);
    const { cart } = useContext(ProductContext);
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(prev => !prev);
    };

    return (
        <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
            {
                user
                    ? (
                        <Box sx={{ py: 2, backgroundColor: 'primary.main' }}>
                            <Box
                                component="img"
                                src="/logo.png"
                                alt="Descripción de la imagen"
                                mx={3}
                                sx={{
                                    width: 200,
                                    height: 'auto',
                                    borderRadius: 2,
                                    mb: 1
                                }}
                            />
                            <Typography className='ff-noto-sans' sx={{ color: '#fff', textAlign: 'center', fontWeight: 'light', fontSize: '1.5rem' }}>
                                Bienvenido/a {user.name}!
                            </Typography>
                            <Divider sx={{ borderColor: '#fff', mt: 1 }} />
                            <Stack direction="row" spacing={3} sx={{ mt: 2, justifyContent: 'center' }}>
                                <IconButton component={Link} to="/user/favorites" color="inherit">
                                    <Badge badgeContent={favorites.length} color="error">
                                        <FavoriteIcon sx={{ color: '#fff' }} />
                                    </Badge>
                                </IconButton>
                                <IconButton component={Link} to="/cart" color="inherit">
                                    <Badge badgeContent={cart.length} color="error">
                                        <ShoppingCartIcon sx={{ color: '#fff' }} />
                                    </Badge>
                                </IconButton>
                                <IconButton onClick={handleLogout} fontSize="large" sx={{ color: 'red' }}>
                                    <ExitToAppIcon />
                                </IconButton>
                            </Stack>
                        </Box>
                    )
                    : (
                        <Box sx={{ py: 2, backgroundColor: 'primary.main' }}>
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
                            <Box sx={{ display: 'flex', alignItems: 'center', py: 2, justifyContent: 'center' }}>
                                <Button
                                    variant='outlined'
                                    component={Link}
                                    to="/login"
                                    sx={{ color: '#fff', border: '1px solid #fff' }}
                                >
                                    Iniciar sesión
                                </Button>
                            </Box>
                        </Box>
                    )
            }
            <List sx={{ width: 250 }}>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/">
                        <ListItemText primary={
                            <Typography color="primary.main" fontWeight={600}>
                                Inicio
                            </Typography>
                        } />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleClick}>
                        <ListItemText
                            primary={
                                <Typography color="primary.main" fontWeight={600}>
                                    Categorías
                                </Typography>
                            }
                        />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding sx={{ backgroundColor: 'primary.main' }}>
                        {categories.map((cat) => (
                            <ListItemButton key={cat.name} component={Link} to={`/category?q=${cat.name}`}>
                                <ListItemText primary={
                                    <Typography sx={{ color: '#fff' }} fontWeight={600}>
                                        {cat.icon} {cat.name}
                                    </Typography>
                                }
                                />
                            </ListItemButton>
                        ))}
                    </List>
                </Collapse>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/contact">
                        <ListItemText primary={
                            <Typography color="primary.main" fontWeight={600}>
                                Contacto
                            </Typography>
                        } />
                    </ListItemButton>
                </ListItem>
                {
                    user
                        ? (
                            <ListItem disablePadding>
                                <ListItemButton component={Link} to="/product/sell">
                                    <ListItemText primary={
                                        <Typography color="primary.main" fontWeight={600}>
                                            Vender
                                        </Typography>
                                    } />
                                </ListItemButton>
                            </ListItem>
                        )
                        : ''
                }
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/help">
                        <ListItemText primary={
                            <Typography color="primary.main" fontWeight={600}>
                                Ayuda
                            </Typography>
                        } />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer >

    )
}

export default MenuMobile;