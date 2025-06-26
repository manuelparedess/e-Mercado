import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../context/UserContext';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';


const FavoriteButton = ({ product }) => {

    const { user } = useContext(AuthContext);
    const { favorites, handleAddFavorite, handleDeleteFavorite } = useContext(UserContext);

    const handleFavorite = (e) => {
        e.stopPropagation();
        favorites.find(p => p.product === product._id)
        ? handleDeleteFavorite(product._id)
        : handleAddFavorite(product._id);
    }

    return (
        <>
            {
                user
                    ? (
                        <IconButton
                            onClick={handleFavorite}
                            color={favorites.find(p => p.product === product._id) ? 'error' : 'default'}
                            size="small"
                            sx={{ p: 0 }}
                        >
                            {favorites.find(p => p.product === product._id) ? (
                                <FavoriteIcon color="error" />
                            ) : (
                                <FavoriteBorderIcon />
                            )}
                        </IconButton>
                    )
                    : ''
            }

        </>

    )
}

export default FavoriteButton;