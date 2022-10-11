import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt from "jwt-decode";

const decode = () => {
    if (localStorage.getItem('TOKEN')) {
        var code = jwt(localStorage.getItem('TOKEN'));
        return code;
    }
    return "";
}

const initialState = { isAuthenticated: false || localStorage.getItem('TOKEN') != null, role: "" || decode().role, id: 0 || decode().id }

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true
            state.role = action.payload;
        },

        logout: state => { state.isAuthenticated = false },

        setEmployeeID: (state, action) => {
            state.id = action.payload;
        }
    }
})

export const { login, logout, setEmployeeID } = authSlice.actions

// export const newEmployeeThunk = (email, password) => async dispatch => {
//     axios.post(`${process.env.REACT_APP_API_SERVER}/admin/newemployee`,
//         { email, password }).then(response => { console.log(response) })
// }

export const adminLoginThunk = (username, password) => async dispatch => {
    axios.post(`${process.env.REACT_APP_API_SERVER}/admin/login`,
        { username, password }).then(async response => {
            if (response.data === null) {
                console.log('Login failed');
            }
            else {
                console.log("response.data:", response.data.token)
                await localStorage.setItem('TOKEN', response.data.token);
                await dispatch(login("admin"));
                await dispatch(setEmployeeID(decode().id));
            }
        })
}

export const adminScanerThunk = (employee_id, in_time, date) => async dispatch => {
    //check if punch-in today yet
    axios.post(`${process.env.REACT_APP_API_SERVER}/admin/punchin`,
        { employee_id, in_time, date }).then(response => {
            if (response.data === null) {
                console.log('Login failed');
            }
            else {
                console.log("response.data:", response.data)
                //notification: punch-in successed
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

export const employeePunchOutThunk = (employee_id, out_time) => async dispatch => {
    var employee_data = await axios.get(`${process.env.REACT_APP_API_SERVER}/employee/punch/${employee_id}`);
    var in_time = employee_data.data.in_time;

    var status = "";

    //calculating the day_working_hour and status
    function diff(start, end) {
        start = start.split(":");
        end = end.split(":");
        var startDate = new Date(0, 0, 0, start[0], start[1], start[2]);
        var endDate = new Date(0, 0, 0, end[0], end[1], end[2]);
        var diff = endDate.getTime() - startDate.getTime();
        var hours = Math.floor(diff / 1000 / 60 / 60);
        diff -= hours * 1000 * 60 * 60;
        var minutes = Math.floor(diff / 1000 / 60);
        diff -= minutes * 1000 * 60;
        var seconds = Math.floor(diff / 1000);

        // If using time pickers with 24 hours format, add the below line get exact hours
        if (hours < 0) {
            hours = hours + 24;
        }

        //assume that the lunch hour is 12pm - 2pm
        if (start[0] > "12" || end[0] < "2") {
            status = "HALF DAY";
        } else if (start[0] <= "9" && end[0] >= "5") {
            status = "ON_TIME";
        } else {
            status = "ABSENT";
        }

        return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes + ":" + (seconds <= 9 ? "0" : "") + seconds;
    }

    var id = employee_data.data.id;

    axios.put(`${process.env.REACT_APP_API_SERVER}/employee/punchout`,
        { id, out_time, day_working_hour: diff(in_time, out_time), status }).then(response => {
            if (response.data === null) {
                console.log('Login failed');
            }
            else {
                console.log("response.data:", response.data);
                //notification: punch-out successed
            }
        })
}

export const logoutThunk = () => dispatch => {
    localStorage.removeItem('TOKEN');
    dispatch(logout());
}
export default authSlice.reducer