import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import './Home.scss';
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const auth = useSelector((state) => state.authStore.isAuthenticated);
    const role = useSelector((state) => state.authStore.role)
    useEffect(() => {
        if (auth === true) {
            navigate(`/${role}`);
        }
    }, [auth, role, navigate])
    return (
        <div>
            <section id="section-2" className="role-select">
                {/*  employee */}
                <br />
                <div className="minicard">
                    <h3>Employee Login</h3>
                    <div className="button-group">
                        <button onClick={() => { navigate(`/employee_login`) }}>Login</button>
                    </div>
                </div>
                <br />

                {/* admin  */}
                <div className="minicard minicard--inverted">
                    <h3>Admin Login</h3>
                    <div className="button-group">
                        <button onClick={() => { navigate(`/admin_login`) }}>Login</button>
                    </div>
                </div>
            </section>
        </div>
    )
}
