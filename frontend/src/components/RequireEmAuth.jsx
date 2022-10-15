import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function RequireEmAuth(props) {
    const isAuthenticated = useSelector((state) => state.authStore.isAuthenticated);
    const role = useSelector((state) => state.authStore.role);
    return isAuthenticated && role === 'employee' ? props.children : <Navigate to="/employee_login" />;
}
