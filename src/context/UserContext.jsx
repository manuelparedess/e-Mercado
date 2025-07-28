import React, { createContext, useContext, useEffect, useState } from 'react';

import { updateUser } from '../api/user/updateUser';
import { updatePassword } from '../api/user/updatePassword';
import { deleteUser } from '../api/user/deleteUser';
import { AuthContext } from './AuthContext';
import { addFavorite } from '../api/user/addFavorite';
import { deleteFavorite } from '../api/user/deleteFavorite';
import { getUserById2 } from '../api/user/getUserById';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [error, setError] = useState(false);
    const { user, setUser } = useContext(AuthContext);

    //set favorites
    const [favorites, setFavorites] = useState([]);
    useEffect(() => {
        if (user?.favorites) {
            setFavorites(user.favorites);
        }
    }, [user]);

    //delete user
    const handleDelete = async () => {
        try {
            setError(false);
            await deleteUser();
            setUser(null);
        } catch (error) {
            setError(error.msg);
        }
    }

    //update user
    const handleUpdate = async (data) => {
        try {
            setError(false);
            await updateUser(data);
            setUser(data);
        } catch (error) {
            setError(error.msg);
        }
    }

    //updatePassword
    const handleUpdatePassword = async (data) => {
        try {
            setError(false);
            await updatePassword(data);
            return true;
        } catch (error) {
            setError(error.msg);
            return false;
        }
    }

    //addFavorite
    const handleAddFavorite = async (id) => {
        try {
            setError(false);
            await addFavorite(id);
            setFavorites([...favorites, { product: id }])
        } catch (error) {
            setError(error.msg);
        }
    }

    //deleteFavorite
    const handleDeleteFavorite = async (id) => {
        try {
            setError(false);
            await deleteFavorite(id);
            const newFavorites = favorites.filter((p) => p.product !== id);
            setFavorites(newFavorites);
        } catch (error) {
            setError(error.msg);
        }
    }

    //get user by id
    const handleGetUserById = async (id) => {
        try {
            const user = await getUserById2(id);
            return user;
        } catch (error) {
            return null;
        }
    }


    const data = {
        error,
        favorites,
        setError,
        handleUpdate,
        handleUpdatePassword,
        handleDelete,
        handleAddFavorite,
        handleDeleteFavorite,
        handleGetUserById
    };

    return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
}
