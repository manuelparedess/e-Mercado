import React, { useContext, useState } from 'react';
import { ProductContext } from '../../context/ProductContext';

import { Box, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


const QuantityCounter = ({ product, initial }) => {
    const [count, setCount] = useState(initial);
    const { handleUpdateQuantity } = useContext(ProductContext);

    const handleIncrement = () => {
        const max = product.stock;
        if (count < max) {
            const newCount = count + 1;
            setCount(newCount);
            handleUpdateQuantity(product._id, newCount);
        }
    };
    
    const handleDecrement = () => {
        if (count > 1) {
            const newCount = count - 1;
            setCount(newCount);
            handleUpdateQuantity(product._id, newCount);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #ccc',
                borderRadius: 2,
                width: {xs: 90, md: 120},
                height: { xs: 35, sm: 40},
                backgroundColor: '#f9f9f9',
            }}
        >
            <IconButton onClick={handleDecrement} sx={{ color: '#1f8946', display: {xs: 'none', sm: 'inherit' } }} disabled={count <= 1}>
                <RemoveIcon />
            </IconButton>

            <IconButton onClick={handleDecrement} size='small' sx={{ color: '#1f8946', display: {xs: 'inherit', sm: 'none' } }} disabled={count <= 1}>
                <RemoveIcon fontSize='small' />
            </IconButton>

            <Typography sx={{ flexGrow: 1, textAlign: 'center', color: '#1f8946' }}>
                {count}
            </Typography>

            <IconButton onClick={handleIncrement} sx={{ color: '#1f8946', display: {xs: 'none', sm: 'inherit' } }} disabled={count >= product.stock}>
                <AddIcon />
            </IconButton>

            <IconButton onClick={handleIncrement} size='small' sx={{ color: '#1f8946', display: {xs: 'inherit', sm: 'none' } }} disabled={count >= product.stock}>
                <AddIcon fontSize='small' />
            </IconButton>
        </Box>
    );
};

export default QuantityCounter;