import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PublicRoutes = () => {

    const { user } = useContext(AuthContext);

    return !!user ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoutes;