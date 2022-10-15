import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function RequireAdminAuth(props) {
    const isAuthenticated = useSelector((state) => state.authStore.isAuthenticated);
    const role = useSelector((state) => state.authStore.role);
    return isAuthenticated && role === 'admin' ? props.children : <Navigate to="/admin_login" />;
}
