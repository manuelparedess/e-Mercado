import React from "react";
import CategoryCard from "../../components/modules/CategoryCard";

import { Box, Typography } from "@mui/material";
//icons
import DevicesIcon from "@mui/icons-material/Devices";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import WatchIcon from "@mui/icons-material/Watch";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const categories = [
    { name: "Tecnología", icon: <DevicesIcon fontSize="large" /> },
    { name: "Hogar", icon: <HomeIcon fontSize="large" /> },
    { name: "Calzado", icon: <DirectionsRunIcon fontSize="large" /> },
    { name: "Ropa", icon: <CheckroomIcon fontSize="large" /> },
    { name: "Accesorios", icon: <WatchIcon fontSize="large" /> },
    { name: "Vehiculos", icon: <DirectionsCarIcon fontSize="large" /> },
];

const CategoriesPage = () => {
    return (
        <Box sx={{ maxWidth: 1000, mx: "auto", p: 4, mt: 5 }}>
            <Typography
                className="ff-noto-sans"
                variant="h4"
                fontWeight={700}
                gutterBottom
                textAlign="center"
                sx={{ mb: 6, color: 'primary.main' }}
            >
                Explorá por Categoría
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 3,
                    justifyContent: "center",
                    mt: 2,
                }}
                className="animate__animated animate__zoomIn" 
            >
                {categories.map((cat) => (
                    <CategoryCard category={cat} key={cat.name} />
                ))}
            </Box>
        </Box>
    );
};

export default CategoriesPage;