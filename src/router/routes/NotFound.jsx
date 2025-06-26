import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#1f8946",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                px: 2,
            }}
        >
            <Typography variant="h1" fontWeight={800} sx={{color: '#fff'}} gutterBottom>
                404
            </Typography>
            <Typography variant="h5" sx={{color: '#fff'}} mb={3}>
                Uy... la página que buscás no existe.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/")}
                sx={{ mt: 2 }}
            >
                Volver al inicio
            </Button>
        </Box>
    );
};

export default NotFound;