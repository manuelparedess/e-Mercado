import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

export default function ImageCarousel({ images }) {
    const [current, setCurrent] = useState(0);

    if (!images.length) return null;

    const prev = () => {
        setCurrent((c) => (c - 1 + images.length) % images.length);
    };

    const next = () => {
        setCurrent((c) => (c + 1) % images.length);
    };

    return (
        <Box
            position="relative"
            sx={{
                borderRadius: 2,
                overflow: "hidden",
                width: "100%",
                height: 400,
                bgcolor: "#f5f5f5",
            }}
        >
            <Box
                component="img"
                src={`https://e-mercado.onrender.com${images[current]}`}
                alt={`img-${current}`}
                sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                }}
            />
            <IconButton
                onClick={prev}
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: 8,
                    transform: "translateY(-50%)",
                    bgcolor: "rgba(255,255,255,0.7)",
                }}
            >
                <ArrowBackIos />
            </IconButton>
            <IconButton
                onClick={next}
                sx={{
                    position: "absolute",
                    top: "50%",
                    right: 8,
                    transform: "translateY(-50%)",
                    bgcolor: "rgba(255,255,255,0.7)",
                }}
            >
                <ArrowForwardIos />
            </IconButton>
        </Box>
    );
}