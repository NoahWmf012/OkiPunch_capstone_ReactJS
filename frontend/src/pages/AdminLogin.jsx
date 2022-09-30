import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { adminLoginThunk } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.scss";

//add alert if the invalid role / incorrect pw / username
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export default function AdminLogin() {
    const [username, setUsername] = useState("Insert Username");
    const [password, setPassword] = useState("Insert Password");
    const auth = useSelector((state) => state.authStore.isAuthenticated);
    const role = useSelector((state) => state.authStore.role);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (auth) {
            navigate(`/${role}`)
        }
    }, [auth, role, navigate]);

    //add alert if the invalid role / incorrect pw / username
    // const notify = () => toast("Wow so easy!");
    // <div>
    //     <button onClick={notify}>Notify!</button>
    //     <ToastContainer />
    // </div>

    return (
        <div className="card card--inverted">
            <h2>Admin Login</h2>
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
                <button onClick={() => dispatch(adminLoginThunk(username, password))}>Login</button>
            </div>
        </div>
    )
}
