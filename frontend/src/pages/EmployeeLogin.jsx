import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { employeeLoginThunk } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.scss";

export default function EmployeeLogin() {
    const [username, setUsername] = useState("Insert Username");
    const [password, setPassword] = useState("Insert Password");
    const auth = useSelector((state) => state.authStore.isAuthenticated);
    const role = useSelector((state) => state.authStore.role);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (auth) {
            navigate(`/${role}`);
        }
    }, [auth, role, navigate]);

    return (
        <div className="card">
            <h2>Employee Login</h2>
            <label className="input">
                <input className="input__field" type="text" placeholder=" " onChange={(e) => setUsername(e.currentTarget.value)} />
                <span className="input__label">Username</span>
            </label>
            <br />
            <label className="input">
                <input className="input__field" type="password" placeholder=" " onChange={(e) => setPassword(e.currentTarget.value)} />
                <span className="input__label">Password</span>
            </label>
            <div className="button-group">
                <button onClick={() => dispatch(employeeLoginThunk(username, password))}>Send</button>
            </div>
        </div>
    )
}
