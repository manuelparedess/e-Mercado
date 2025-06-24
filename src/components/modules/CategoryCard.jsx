import { Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ category }) => {

    const navigate = useNavigate();

    const handleCategoryClick = () => {
        navigate(`/category?q=${category.name}`);
    };

    return (
        <Paper
            onClick={() => handleCategoryClick()}
            sx={{
                width: '30%',
                p: 4,
                textAlign: "center",
                cursor: "pointer",
                borderRadius: 3,
                boxShadow: 3,
                transition: "0.3s",
                height: 180,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                '&:hover': {
                    boxShadow: 6,
                    bgcolor: "primary.light",
                    color: "white",
                },
            }}
        >
            <Stack direction="column" spacing={2} alignItems="center">
                {category.icon}
                <Typography variant="h6" fontWeight={600}>
                    {category.name}
                </Typography>
            </Stack>
        </Paper>
    )
}

export default CategoryCard