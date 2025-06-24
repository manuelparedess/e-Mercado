import React from "react";
import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
    {
        question: "¿Cómo puedo crear una cuenta?",
        answer:
            "Hacé clic en 'Iniciar sesion' en la esquina superior derecha y completá el formulario de registro con tus datos.",
    },
    {
        question: "¿Cómo realizo una compra?",
        answer:
            "Buscá un producto, agregalo al carrito y luego seguí los pasos del proceso de pago.",
    },
    {
        question: "¿Puedo devolver un producto?",
        answer:
            "Sí, aceptamos devoluciones dentro de los 15 días posteriores a la recepción del producto.",
    },
    {
        question: "¿Cómo contacto al vendedor?",
        answer:
            "En la página del producto podés ver el perfil del vendedor y contactarlo directamente desde allí.",
    },
    {
        question: "¿Qué métodos de pago aceptan?",
        answer:
            "Aceptamos tarjetas de crédito, débito y transferencias bancarias. También podés pagar con MercadoPago.",
    },
];

const HelpPage = () => {
    return (
        <Box
            sx={{
                maxWidth: 800,
                mx: "auto",
                my: 6,
                px: 3,
            }}
        >
            <Typography className='ff-noto-sans' variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#1f8946' }}>
                Centro de ayuda
            </Typography>
            <Divider sx={{ mb: 3, borderColor: 'primary.main' }} />
            <Typography variant="body1" color="text.secondary" mb={4}>
                Encontrá respuestas a las preguntas más frecuentes.
            </Typography>

            {faqs.map((faq, i) => (
                <Accordion key={i} sx={{ mb: 2 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography color="primary.main" fontWeight={600}>{faq.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{faq.answer}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
};

export default HelpPage;