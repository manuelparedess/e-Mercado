import React, { useContext, useEffect, useState } from "react";
import {
    Typography,
    Box,
    Stack,
    Divider,
    Grid,
    Button,
    TextField,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import Swal from 'sweetalert2';

const UserPage = () => {

    const { user } = useContext(AuthContext);
    const { name, lastname, email, address } = user;

    const { handleUpdate } = useContext(UserContext);
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(user);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setFormData(user);
    }, [isEditing]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name.startsWith("address.")) {

            const key = name.split(".")[1];

            setFormData({
                ...formData,
                address: { ...formData.address, [key]: value }
            });

        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSave = () => {
        setIsEditing(false);
        handleUpdate(formData);
        Swal.fire({
            icon: 'success',
            title: '¡Usuario actualizado!',
            confirmButtonColor: '#1f8946',
        });
    };

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
                    <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <PersonIcon color="primary" />
                            <Typography variant="subtitle2" color="text.secondary">
                                Nombre Completo
                            </Typography>
                        </Stack>
                        {isEditing
                            ? (
                                <TextField
                                    label="Nombre"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="dense"
                                    variant="standard"
                                />
                            ) : (name || lastname)
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
                    {isEditing ? (
                        <Grid item size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: 'flex', alignItems: 'end'}}>
                            <TextField
                                label="Apellido"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                fullWidth
                                margin="dense"
                                variant="standard"
                            />
                        </Grid>
                    ) : null}

                    <Grid item size={{ xs: 12, sm: 6, md: 'grow' }} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <MailOutlineIcon color="primary" />
                            <Typography variant="subtitle2" color="text.secondary">
                                Correo Electrónico
                            </Typography>
                        </Stack>
                        {isEditing ? (
                            <TextField
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                fullWidth
                                margin="dense"
                                variant="standard"
                            />
                        ) : (
                            <Typography variant="body1" mt={0.5}>
                                {email}
                            </Typography>
                        )}
                    </Grid>

                    {/* Dirección */}
                    {isEditing
                        ? (
                            <Grid item size={{ xs: 12 }}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <LocationOnIcon color="primary" />
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Dirección
                                    </Typography>
                                </Stack>
                                <Stack direction={{xs: 'column', md: 'row'}} spacing={2} mt={1}>
                                    <TextField
                                        label="Calle"
                                        name="address.street"
                                        value={formData.address?.street || ""}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                    <TextField
                                        label="Ciudad"
                                        name="address.city"
                                        value={formData.address?.city || ""}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                    <TextField
                                        label="País"
                                        name="address.country"
                                        value={formData.address?.country || ""}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>

                        ) : (
                            <Grid item size={{ xs: 12, md: 6 }}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <LocationOnIcon color="primary" />
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Dirección
                                    </Typography>
                                </Stack>
                                {
                                    (address.street || address.city || address.country) ? (
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
                        )
                    }

                </Grid>
                <Box mt={4}>
                    {isEditing ? (
                        <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                            <Button variant="contained" color="primary" onClick={handleSave}>
                                Guardar cambios
                            </Button>
                            <Button variant="outlined" onClick={() => setIsEditing(false)}>
                                Cancelar
                            </Button>
                            <Button variant="text" color="primary" onClick={() => navigate('/user/password')}>
                                Cambiar contraseña
                            </Button>
                        </Stack>
                    ) : (
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" onClick={() => setIsEditing(true)}>
                                Editar perfil
                            </Button>
                            <Button variant="outlined" color="error" onClick={() => setOpen(true)}>
                                Eliminar usuario
                            </Button>
                        </Stack>
                    )}
                </Box>

                <Divider sx={{ mt: 4, mb: 2, borderColor: '#0f6e33' }} />

                <Typography variant="caption" color="text.secondary">
                    Datos del usuario generados para fines de demostración. © {new Date().getFullYear()}
                </Typography>
                ,
            </Box >
            <Box mt={3} display="flex" justifyContent="center">
                <Button
                    component={Link}
                    to="/user/products"
                    variant="text"
                    sx={{
                        mt: 1,
                        border: '1px solid #ccc',
                        '&:hover': {
                            backgroundColor: '#f5f5f5',
                        },
                    }}
                >
                    Ver productos del usuario
                </Button>
            </Box>
            <ConfirmationModal open={open} setOpen={setOpen} option={'usuario'} />
        </>
    );
}



export default UserPage;