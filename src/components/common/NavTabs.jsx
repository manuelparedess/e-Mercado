import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Tabs, Tab } from '@mui/material';

const NavTabs = () => {

    const { pathname } = useLocation();

    const [value, setValue] = useState(0);
    const tabPaths = ['/', '/contact', '/categories', '/product/sell', '/category']
    
    useEffect(() => {
        if(tabPaths.includes(pathname)) {
            const currentTab = tabPaths.findIndex(tab => tab === pathname);
            if(currentTab == 4){
                setValue(2);
                return;
            }
            setValue(currentTab);
        } else setValue(false);
    }, [pathname])

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Tabs value={value} onChange={handleTabChange} textColor="inherit" sx={{ '& .MuiTabs-indicator': { backgroundColor: '#f6ec03' } }}>
            <Tab label="Destacado" component={Link} to="/" />
            <Tab label="Contacto" component={Link} to="/contact" />
            <Tab label="Categorias" component={Link} to="/categories" />
            <Tab label="Vender" component={Link} to="/product/sell" /> 
        </Tabs>
    )
}

export default NavTabs