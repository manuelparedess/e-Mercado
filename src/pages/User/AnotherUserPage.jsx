import React from "react";
import {
    Typography,
    Box,
    Stack,
    Divider,
    Grid,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import { useLoaderData } from "react-router-dom";

const AnotherUserPage = () => {

    const { user } = useLoaderData();
    const { name, lastname, email, address } = user;

    return (
        <>
            <Box
                className='animate__animated animate__zoomIn animate__faster'
                sx={{
                    mt: 5,
                    maxWidth: "800px",
                    mx: { xs: 2, md: "auto" },
                    p: 4,
                    bgcolor: "#f9f9f9",
                    borderRadius: 4,
                    boxShadow: 3,
                }}
            >
                <Typography variant="h4" fontWeight={700} gutterBottom color="primary" sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                    Perfil del Usuario
                </Typography>

                <Divider sx={{ mb: 4, borderColor: '#0f6e33' }} />

                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <PersonIcon color="primary" />
                            <Typography variant="subtitle2" color="text.secondary">
                                Nombre Completo
                            </Typography>
                        </Stack>
                        {(name || lastname)
                                ? (
                                    <Typography variant="body1" mt={0.5}>
                                        {`${name} ${lastname}`}
                                    </Typography>
                                )
                                : (
                                    <Typography color="text.secondary" variant="body1" mt={0.5}>
                                        Sin nombre
                                    </Typography>
                                )
                        }
                    </Grid>


                    <Grid item xs={12} sm={6}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <MailOutlineIcon color="primary" />
                            <Typography variant="subtitle2" color="text.secondary">
                                Correo Electrónico
                            </Typography>
                        </Stack>
                            <Typography variant="body1" mt={0.5}>
                                {email}
                            </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <LocationOnIcon color="primary" />
                            <Typography variant="subtitle2" color="text.secondary">
                                Dirección
                            </Typography>
                        </Stack>
                        {(address.street || address.city || address.country) ? (
                                <Typography variant="body1" mt={0.5}>
                                    {address.street}, {address.city}, {address.country}
                                </Typography>
                            ) : (
                                <Typography color="text.secondary" mt={0.5}>
                                    No se proporcionó dirección.
                                </Typography>
                            )
                        }

                    </Grid>
                </Grid>

                <Divider sx={{ mt: 4, mb: 2, borderColor: '#0f6e33' }} />

                <Typography variant="caption" color="text.secondary">
                    Datos del usuario generados para fines de demostración. © {new Date().getFullYear()}
                </Typography>
            </Box>
        </>
    );
}


export default AnotherUserPage;