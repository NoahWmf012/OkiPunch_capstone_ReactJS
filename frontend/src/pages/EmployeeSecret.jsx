import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/employee/EmSideBar';
import { Outlet } from "react-router-dom";

export default function EmployeeSecret() {
    const navigate = useNavigate();
    const auth = useSelector((state) => state.authStore.isAuthenticated);
    const role = useSelector((state) => state.authStore.role);

    useEffect(() => {
        if (auth === false || role !== 'employee') {
            navigate("/employee_login");
        }
    }, [auth, role, navigate]);

    return (
        <div className='employee-secret'>
            <SideBar />
            <Outlet />
        </div>
    )
}
