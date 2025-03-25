import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRouteAdmin = () => {
    const { isAuthenticated, admin } = useSelector((state) => state.adminAuth);
    console.log("ProtectedRouteAdmin - isAuthenticated:", isAuthenticated);
    console.log("ProtectedRouteAdmin - Admin:", admin);
    console.log("ProtectedRouteAdmin - Admin Role:", admin?.role);

    // Check if the user is authenticated and has the admin role
    return isAuthenticated && admin?.role === 'admin' ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default ProtectedRouteAdmin;