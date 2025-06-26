import React, { useContext, useState } from "react";
import { Box, TextField, Typography, Button, Stack, Divider, Alert } from "@mui/material";
import { UserContext } from "../../context/UserContext";
import Swal from 'sweetalert2';

const UpdatePasswordPage = () => {

    const { error, setError, handleUpdatePassword } = useContext(UserContext);

    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [different, setDifferent] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        setDifferent(null);
        setSuccess(false);

        if (formData.newPassword !== formData.confirmNewPassword) {
            setDifferent(true);
            setSuccess(false);
            return;
        }

        const result = await handleUpdatePassword({
            password: formData.currentPassword,
            newPassword: formData.newPassword,
        });

        setSuccess(result);
        if (result) {
            setFormData({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
            Swal.fire({
                icon: 'success',
                title: '¡Contraseña cambiada!',
                confirmButtonColor: '#1f8946',
            });
        }


    };

    return (
        <Box
            sx={{
                maxWidth: "500px",
                mx: { xs: 3, sm: "auto" },
                mt: 8,
                mb: 5,
                p: 4,
                bgcolor: "#fff",
                borderRadius: 4,
                boxShadow: 3
            }}
        >
            <Typography variant="h4" fontWeight={700} gutterBottom color="primary" sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                Cambiar Contraseña
            </Typography>

            <Divider sx={{ mb: 3, borderColor: '#0f6e33' }} />

            <form className='animate__animated animate__fadeIn animate__faster' onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        label="Contraseña actual"
                        name="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        error={different}
                        helperText={different ? "Las contraseñas no coinciden." : ""}
                        label="Nueva contraseña"
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        fullWidth
                    />

                    <TextField
                        error={different}
                        helperText={different ? "Las contraseñas no coinciden." : ""}
                        label="Confirmar nueva contraseña"
                        name="confirmNewPassword"
                        type="password"
                        value={formData.confirmNewPassword}
                        onChange={handleChange}
                        fullWidth
                    />

                    <Button type="submit" variant="contained" color="primary">
                        Guardar cambios
                    </Button>

                    {success
                        ? (
                            <Alert severity='success'>Contraseña cambiada correctamente</Alert>
                        )
                        : error ? <Alert severity='error'>{error}</Alert> : ''
                    }
                </Stack>
            </form>
        </Box>
    );
}


export default UpdatePasswordPage;