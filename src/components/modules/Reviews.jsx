import React, { useContext, useEffect, useState } from 'react'
import { addReview } from '../../api/product/addReview';
import { deleteReview } from '../../api/product/deleteReview';

import { UserContext } from '../../context/UserContext';
import { AuthContext } from '../../context/AuthContext';

import Swal from 'sweetalert2';
import { Box, Button, Divider, Paper, Rating, Stack, TextField, Typography } from '@mui/material';

const Reviews = ({ product }) => {

    const { user } = useContext(AuthContext);
    const { handleGetUserById } = useContext(UserContext);

    const [reviews, setReviews] = useState(product.reviews);
    const [alreadyReviewed, setAlreadyReviewed] = useState(false);
    const [newText, setNewText] = useState("");
    const [newRating, setNewRating] = useState(0);

    useEffect(() => {
        (async () => {
            if (reviews.length) {
                const updatedReviews = [];
                for (const rev of reviews) {
                    const creator = await handleGetUserById(rev.user);
                    updatedReviews.push({
                        ...rev,
                        user: creator.user || { name: 'Usuario', lastname: 'Eliminado' },
                    });
                    if (user && creator.user.email === user.email) setAlreadyReviewed(true);
                }
                setReviews(updatedReviews);
            }
        })()
    }, [product]);

    const handleReviewSubmit = async () => {
        const newReview = {
            user,
            rating: newRating,
            text: newText,
            createdAt: Date.now()
        }
        try {
            await addReview(product._id, newRating, newText);

            Swal.fire({
                icon: 'success',
                title: '¡Reseña enviada!',
                confirmButtonColor: '#1f8946',
            });

            setNewText("");
            setNewRating(0);
            setAlreadyReviewed(true);
            setReviews([...reviews, newReview]);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: error.msg,
                confirmButtonColor: '#1f8946',
            });
        }
    };

    const handleDeleteReview = async () => {
        const newReviews = reviews.filter((r) => r.user.email !== user.email);
        setReviews(newReviews);
        setAlreadyReviewed(false);

        await deleteReview(product._id);
        Swal.fire({
            icon: 'success',
            title: '¡Reseña eliminada!',
            confirmButtonColor: '#1f8946',
        });
    }

    return (
        <Box mt={6} className="animate__animated animate__backInUp">
            <Typography variant="h5" gutterBottom fontWeight={700}>
                Opiniones de usuarios
            </Typography>
            <Divider sx={{ mb: 3, borderColor: 'primary.main' }} />

            {
                user
                    ? (
                        <Paper sx={{ p: 3, mb: 4 }}>
                            <Typography variant="subtitle1" gutterBottom>
                                Dejá tu reseña
                            </Typography>
                            <Rating
                                value={newRating}
                                onChange={(e, val) => setNewRating(val)}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                placeholder="Escribí tu comentario..."
                                value={newText}
                                onChange={(e) => setNewText(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <Stack direction={'row'} sx={{width: '100%'}}>
                                <Button
                                    variant="contained"
                                    onClick={handleReviewSubmit}
                                    disabled={!newText || newRating === 0}
                                    sx={{ display: { xs: 'none', md: 'inherit' } }}
                                >
                                    Enviar reseña
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={handleReviewSubmit}
                                    disabled={!newText || newRating === 0}
                                    sx={{ display: { xs: 'inherit', md: 'none' } }}
                                    size='small'
                                >
                                    Enviar reseña
                                </Button>
                                {
                                    alreadyReviewed
                                        ? (
                                            <>
                                                <Button
                                                    variant="contained"
                                                    color='error'
                                                    onClick={handleDeleteReview}
                                                    sx={{ display: { xs: 'none', md: 'inherit' }, mx: 2 }}
                                                >
                                                    Borrar reseña
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color='error'
                                                    onClick={handleDeleteReview}
                                                    sx={{ display: { xs: 'inherit', md: 'none' }, mx: 2 }}
                                                    size='small'
                                                >
                                                    Borrar reseña
                                                </Button>
                                            </>
                                        )
                                        : ''
                                }
                            </Stack>
                        </Paper>
                    )
                    : ''
            }


            {reviews.length > 0 ? (
                reviews.map((review, i) => (
                    <Paper
                        key={i}
                        sx={{
                            p: 3,
                            mb: 2,
                            position: "relative",
                            backgroundColor: "#fff",
                            borderLeft: "4px solid #1f8946",
                        }}
                    >
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography fontWeight={600}>
                                {review.user.name} {review.user.lastname}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {new Date(review.createdAt).toLocaleDateString()}
                            </Typography>
                        </Box>
                        <Rating
                            value={review.rating}
                            readOnly
                            size="small"
                            sx={{ mt: 1, mb: 1 }}
                        />
                        <Typography variant="body2">{review.text}</Typography>
                    </Paper>
                ))
            ) : (
                <Typography variant="body2" color="text.secondary">
                    Este producto aún no tiene reseñas.
                </Typography>
            )}
        </Box>
    )
}

export default Reviews;