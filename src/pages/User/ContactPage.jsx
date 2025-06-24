import React from "react";
import {
    Box,
    Typography,
    Paper,
    Stack,
    IconButton,
    Link as MuiLink,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

const ContactPage = () => {
    return (
        <Box
            sx={{
                minHeight: "50vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                px: 2,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    maxWidth: 600,
                    width: "100%",
                    p: 4,
                    borderRadius: 4,
                    textAlign: "center",
                }}
            >
                <Typography variant="h4" fontWeight={700} gutterBottom color="primary">
                    Manuel Paredes
                </Typography>

                <Typography variant="body1" color="text.secondary" mb={4}>
                    Soy desarrollador full stack con enfoque en tecnologías modernas como
                    MERN. Apasionado por crear experiencias web funcionales y atractivas.
                    Si querés contactarme, podés hacerlo a través de las siguientes redes:
                </Typography>

                <Stack direction="row" spacing={3} justifyContent="center">
                    <IconButton
                        component={MuiLink}
                        href="https://github.com/manuelparedess" 
                        target="_blank"
                        rel="noopener noreferrer"
                        color="inherit"
                    >
                        <GitHubIcon fontSize="large" />
                    </IconButton>

                    <IconButton
                        component={MuiLink}
                        href="https://www.linkedin.com/in/manuel-paredes-dev" 
                        target="_blank"
                        rel="noopener noreferrer"
                        color="primary"
                    >
                        <LinkedInIcon fontSize="large" />
                    </IconButton>

                    <IconButton
                        component={MuiLink}
                        href="mailto:luisparedescuenca@gmail.com" 
                        color="secondary"
                    >
                        <EmailIcon fontSize="large" />
                    </IconButton>
                </Stack>
            </Paper>
        </Box>
    );
};

export default ContactPage;