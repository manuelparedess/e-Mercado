import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../context/UserContext';
import { ProductContext } from '../../context/ProductContext';

import Swal from 'sweetalert2';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Divider } from "@mui/material";

const ConfirmationModal = ({ open, setOpen, option, id = 0 }) => {

    const { setReload } = useContext(AuthContext);
    const { handleDelete } = useContext(UserContext);
    const { handleDeleteProduct } = useContext(ProductContext);
    const navigate = useNavigate();

    const handleEliminateUser = () => {
        handleDelete();
        setReload(true);
        setOpen(false);
        navigate('/', { replace: true });
        Swal.fire({
            icon: 'success',
            title: '¡Usuario eliminado!',
            confirmButtonColor: '#1f8946',
        });
    };

    const handleEliminateProduct = () => {
        handleDeleteProduct(id);
        navigate('/user/products', { replace: true });
        setOpen(false);
        Swal.fire({
            icon: 'success',
            title: '¡Producto eliminado!',
            confirmButtonColor: '#1f8946',
        });
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle sx={{ color: 'red' }}>¿Eliminar {option}?</DialogTitle>
            <Divider sx={{ borderColor: '#0f6e33' }} />
            <DialogContent>
                <Typography>
                    ¿Estás seguro de que querés eliminar este {option}? Esta acción no se puede deshacer.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancelar</Button>
                {
                    option == 'producto'
                        ? (
                            <Button color="error" onClick={handleEliminateProduct}>
                                Eliminar
                            </Button>
                        )
                        : (
                            <Button color="error" onClick={handleEliminateUser}>
                                Eliminar
                            </Button>
                        )
                }

            </DialogActions>
        </Dialog>
    )
}

export default ConfirmationModal