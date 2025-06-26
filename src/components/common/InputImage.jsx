import React from 'react';
import { Button, Grid, Paper } from '@mui/material';

const InputImage = ({ formData, setFormData, limit }) => {

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const totalImages = formData.images.length + files.length;
        if (totalImages > limit) {
            alert('Máximo 5 imágenes permitidas');
            return;
        }

        const newImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setFormData({
            ...formData,
            images: [...formData.images, ...newImages],
        });
    };

    const removeImage = (index) => {
        const newImages = formData.images.filter((_, i) => i !== index);
        setFormData({ ...formData, images: newImages });
    };

    return (
        <>
            <Button
                variant="outlined"
                component="label"
                sx={{ mt: 2, mb: 2 }}
            >
                Subir Imágenes (máx {limit})
                <input
                    type="file"
                    accept="image/*"
                    hidden
                    multiple
                    onChange={handleImageUpload}
                />
            </Button>

            <Grid container spacing={2}>
                {formData.images.map((img, idx) => (
                    <Grid item xs={4} key={idx}>
                        <Paper
                            elevation={2}
                            sx={{
                                position: 'relative',
                                overflow: 'hidden',
                                borderRadius: 2,
                            }}
                        >
                            <img
                                src={img.preview}
                                alt={`upload-${idx}`}
                                style={{
                                    width: '100%',
                                    height: '100px',
                                    objectFit: 'cover',
                                }}
                            />
                            <Button
                                size="small"
                                onClick={() => removeImage(idx)}
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    minWidth: 'unset',
                                    p: 0.5,
                                    fontSize: 10,
                                    color: 'white',
                                    backgroundColor: 'rgba(0,0,0,0.6)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0,0,0,0.8)',
                                    },
                                }}
                            >
                                ✕
                            </Button>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default InputImage