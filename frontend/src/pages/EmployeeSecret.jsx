import React, { useEffect } from 'react';
import { logoutThunk } from '../redux/authSlice';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/employee/EmSideBar';
import { Outlet } from "react-router-dom";
export default function EmployeeSecret() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
            <button onClick={() => dispatch(logoutThunk())}>Logout</button>
            compoenets for employee
            <Outlet />
        </div>
    )
}
