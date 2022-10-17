import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { adminLoginThunk } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminLogin() {
    const [username, setUsername] = useState("Insert Username");
    const [password, setPassword] = useState("Insert Password");
    const auth = useSelector((state) => state.authStore.isAuthenticated);
    const role = useSelector((state) => state.authStore.role);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const notify = () => toast.error('Incorrect Username or Password', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

    useEffect(() => {
        if (auth) {
            navigate(`/${role}/showallemployee`)
        }
    }, [auth, role, navigate]);

    return (
        <div className="admin-login">
            <form className="minicard minicard--inverted" onSubmit={(e) => {
                e.preventDefault();
                dispatch(adminLoginThunk(username, password)).then(() => {
                    if (!auth) notify();
                })
            }
            }>
                <h2>Admin Login</h2>
                <label className="miniinput">
                    <input className="miniinput__field" type="text" placeholder=" " onChange={(e) => setUsername(e.currentTarget.value)} />
                    <span className="miniinput__label">Username</span>
                </label>
                <br />
                <label className="miniinput">
                    <input className="miniinput__field" type="password" placeholder=" " onChange={(e) => setPassword(e.currentTarget.value)} />
                    <span className="miniinput__label">Password</span>
                </label>

                <div className="button-group">
                    <button>Login</button>
                </div>
            </form >
            <div className="button-group">
                <button onClick={() => { navigate(`/`) }}>Home</button>
            </div>

            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>

    )
}
