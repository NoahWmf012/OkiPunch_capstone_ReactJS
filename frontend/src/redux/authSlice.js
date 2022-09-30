import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt from "jwt-decode";

const decode = () => {
    if (localStorage.getItem('TOKEN')) {
        var code = jwt(localStorage.getItem('TOKEN'));
        return code.role;
    }
    return "";
}

const initialState = { isAuthenticated: false || localStorage.getItem('TOKEN') != null, role: decode() }

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true
            state.role = action.payload;
        },
        logout: state => { state.isAuthenticated = false }
    }
})
export const { login, logout } = authSlice.actions

// export const newEmployeeThunk = (email, password) => async dispatch => {
//     axios.post(`${process.env.REACT_APP_API_SERVER}/admin/newemployee`,
//         { email, password }).then(response => { console.log(response) })
// }

export const adminLoginThunk = (username, password) => async dispatch => {
    axios.post(`${process.env.REACT_APP_API_SERVER}/admin/login`,
        { username, password }).then(response => {
            if (response.data === null) {
                console.log('Login failed');
            }
            else {
                console.log("response.data:", response.data.token)
                localStorage.setItem('TOKEN', response.data.token);
                dispatch(login("admin"));
            }
        })
}

export const employeeLoginThunk = (username, password) => async dispatch => {
    axios.post(`${process.env.REACT_APP_API_SERVER}/employee/login`,
        { username, password }).then(response => {
            if (response.data === null) {
                console.log('Login failed');
            }
            else {
                console.log("response.data:", response.data.token)
                localStorage.setItem('TOKEN', response.data.token);
                dispatch(login("employee"));
            }
        })
}

export const logoutThunk = () => dispatch => {
    localStorage.removeItem('TOKEN');
    dispatch(logout());
}
export default authSlice.reducer