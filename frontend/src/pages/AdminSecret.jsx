import React, { useEffect } from 'react';
// import { logoutThunk } from '../redux/authSlice';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Outlet } from "react-router-dom";

import {
    SideBar
} from '../components/admin/index'

export default function AdminSecret() {

    const navigate = useNavigate();
    const auth = useSelector((state) => state.authStore.isAuthenticated);
    const role = useSelector((state) => state.authStore.role);
    useEffect(() => {
        if (auth === false || role !== 'admin') {
            navigate("/admin_login");
        }
    }, [auth, role, navigate]);
    return (
        <div>
            <SideBar />
            <Outlet />
        </div>
    )
}
