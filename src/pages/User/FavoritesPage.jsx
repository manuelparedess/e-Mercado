import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext';
import { ProductContext } from '../../context/ProductContext';
import { Box, Divider, Grid, Typography } from '@mui/material';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import ProductResult from '../../components/modules/ProductResult';


const FavoritesPage = () => {

    const { favorites, handleDeleteFavorite } = useContext(UserContext);
    const { handleGetProductById } = useContext(ProductContext);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        (async () => {
            if (favorites.length) {
                const productsFavorites = [];
                for (const fav of favorites) {
                    const product = await handleGetProductById(fav.product);
                    if(product) {
                        productsFavorites.push(product);
                    } else {
                        handleDeleteFavorite(fav.product);
                    }
                }
                setProducts(productsFavorites);
            }
        })()
    }, [favorites])

    return (
        <Box sx={{ px: { xs: 0.5, sm: 2, md: 6 }, py: 4 }}>

            <Typography className='ff-noto-sans' variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#1f8946', textAlign: {xs: 'center', md: 'left'}}}>
                Favoritos
            </Typography>
            <Divider sx={{ mb: 4, borderColor: 'primary.main' }} />

            {favorites.length ? (
                <Grid container spacing={{xs: 1.5, sm: 3}} sx={{justifyContent: 'space-around', mb: 3, px: { xs: 0, sm: 3, md: 5, xl: 0}}}>
                    {products.map((p) => (
                        <ProductResult key={p.product._id} product={p.product} />
                    ))}
                </Grid>

            ) : (
                <Box
                    sx={{
                        py: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                >
                    <HeartBrokenIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h6">
                        No hay productos favoritos.
                    </Typography>
                </Box>
            )}
        </Box>
    )
}

export default FavoritesPage