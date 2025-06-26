import React from 'react';
import { Box, Typography, Link, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                pt: 3,
                pb: 5,
                px: 2,
                mt: {xs: 5, lg: 8},
                backgroundColor: '#fff',
                textAlign: 'center',
            }}
        >
            <Stack
                direction="row"
                spacing={{xs: 3, sm: 5, md: 8, lg: 10, xl: 15}}
                justifyContent="center"
                alignItems="center"
                flexWrap="wrap"
            >
                <Typography variant="body2" color="text.secondary" sx={{display: {xs: 'none', sm: 'block'}}}>
                    Created by Manuel Paredes
                </Typography>
                <Link
                    href="https://github.com/manuelparedess"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="inherit"
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                >
                    <GitHubIcon fontSize="small" />
                    GitHub Profile
                </Link>
                <Link
                    href="https://github.com/manuelparedess/server_e-Mercado"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="inherit"
                    underline="hover"
                >
                    <Box
                        className='me-2'
                        component="img"
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
                        alt="Node.js"
                        sx={{ width: 20, height: 20 }}
                    />
                    Server Repository
                </Link>
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{display: {xs: 'block', sm: 'none'}, pt: 2}}>
                Created by Manuel Paredes
            </Typography>
        </Box>
    )
}

export default Footer