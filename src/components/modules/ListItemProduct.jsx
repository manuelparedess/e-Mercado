import React, { useContext, useEffect, useState } from "react";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    Stack,
    Alert,
    Box,
    Grid,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import Swal from 'sweetalert2';
import FavoriteButton from "../common/FavoriteButton";
import ConfirmationModal from "../common/ConfirmationModal";

const ListItemProduct = ({ product }) => {

    const [open, setOpen] = useState(false);
    const { images, name, price, category, stock, description } = product;
    const navigate = useNavigate();

    return (
        <Grid item size={{ xs: 12, lg: 6 }}>
            <Card
                sx={{
                    height: '100%',
                    display: "flex",
                    flexDirection: "row",
                    alignItems: { xs: 'center', md: "flex-start" },
                    p: 2,
                    px: { xs: 0.5, sm: 2 },
                    borderRadius: 3,
                    boxShadow: 2,
                    mb: 3
                }}
            >
                <CardMedia
                    component="img"
                    src={`https://e-mercado.onrender.com${images[0]}`}
                    alt={name}
                    sx={{
                        width: { xs: 110, sm: 150, xl: 160 },
                        height: { xs: 110, sm: 150, xl: 160 },
                        objectFit: "cover",
                        borderRadius: 2,
                    }}
                />

                <CardContent sx={{ flex: 1, ml: 3, p: 0 }}>
                    <Typography variant="h6" fontWeight={700} gutterBottom sx={{ mb: 0 }}>
                        {name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: { xs: 0.5, sm: 1.5 } }}>
                        {description}
                    </Typography>

                    <Stack direction="row" spacing={{ xs: 1, sm: 3 }} alignItems="center" sx={{ mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            Categoría: <strong>{category}</strong>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Stock: <strong>{stock}</strong>
                        </Typography>
                        <Typography variant="h6" color="primary" sx={{ display: { xs: 'none', md: 'block' } }}>
                            ${price}
                        </Typography>
                    </Stack>

                    <Typography variant="h6" color="primary" sx={{ display: { xs: 'block', md: 'none' }, mb: 1 }}>
                        ${price}
                    </Typography>

                    <Stack direction="row" spacing={1}>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => navigate(`/user/product/update/${product._id}`)}
                        >
                            Editar
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            color="error"
                            onClick={() => setOpen(true)}
                        >
                            Eliminar
                        </Button>
                    </Stack>

                </CardContent>
            </Card>
            <ConfirmationModal open={open} setOpen={setOpen} option={'producto'} id={product._id} />
        </Grid>
    );
};

export default ListItemProduct;