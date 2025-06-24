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
        <>
            <Card
                sx={{
                    width: '45%',
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    p: 2,
                    borderRadius: 3,
                    boxShadow: 2,
                    mb: 3
                }}
            >
                <CardMedia
                    component="img"
                    src={`http://localhost:5000${images[0]}`}
                    alt={name}
                    sx={{
                        width: 160,
                        height: 160,
                        objectFit: "cover",
                        borderRadius: 2,
                    }}
                />

                <CardContent sx={{ flex: 1, ml: 3, p: 0 }}>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                        {name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" paragraph>
                        {description}
                    </Typography>

                    <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            Categoría: <strong>{category}</strong>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Stock: <strong>{stock}</strong>
                        </Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" color="primary">
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
                    </Stack>
                </CardContent>
            </Card>
            <ConfirmationModal open={open} setOpen={setOpen} option={'producto'} id={product._id} />
        </>
    );
};

export default ListItemProduct;