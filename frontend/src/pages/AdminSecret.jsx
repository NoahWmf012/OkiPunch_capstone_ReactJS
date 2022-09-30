import React, { useState, useEffect } from 'react';
import { logoutThunk } from '../redux/authSlice';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Outlet } from "react-router-dom";

import {
    SearchBar,
    SideBar
} from '../components/admin/index'

export default function AdminSecret() {
    const [searchTerm, setSearchTerm] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.authStore.isAuthenticated);
    const role = useSelector((state) => state.authStore.role);
    useEffect(() => {
        if (auth === false || role !== 'admin') {
            navigate("/admin_login");
        }
    }, [auth, role, navigate]);
    console.log(searchTerm)
    return (
        <div>
            <h3>
                AdminSecret
            </h3>
            <SearchBar getData={(data) => {
                setSearchTerm(data);
            }} />
            <SideBar />

            <button onClick={() => dispatch(logoutThunk())}>Logout</button>
            components for admins
            <Outlet />
        </div>
    )
}
