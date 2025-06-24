import React from "react";
import { Card, CardMedia } from "@mui/material";

const publicityImages = [
    "/publicity1.png",
    "/publicity2.png",
    "/publicity3.png"
];

const PublicityCard = () => {
    const randomImage = React.useMemo(() => {
        const index = Math.floor(Math.random() * publicityImages.length);
        return publicityImages[index];
    }, []);

    return (
        <Card sx={{ mb: 6, boxShadow: 3 }}>
            <CardMedia
                component="img"
                src={randomImage}
                alt="Rotative publicity"
                sx={{
                    width: "100%",
                    height: { xs: 180, md: 280 },
                    objectFit: "cover"
                }}
            />
        </Card>
    );
};

export default PublicityCard;