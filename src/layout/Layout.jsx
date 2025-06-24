import React from 'react'
import NavBar from '../components/modules/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/modules/Footer'
import { Box } from '@mui/material'

const Layout = () => {
    return (
        <>
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <NavBar />
                {/* Contenido principal */}
                <Box sx={{ flex: 1 }}>
                    <Outlet />
                </Box>

                <Footer />
            </Box>
        </>
    )
}

export default Layout