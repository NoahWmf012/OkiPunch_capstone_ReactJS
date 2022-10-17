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
                console.log("response.data.token:", response.data.token)
                await localStorage.setItem('TOKEN', response.data.token);
                await dispatch(login("admin"));
                await dispatch(setEmployeeID(decode().id));
            }
        }).catch(err => {
            console.log("error", err);
        })

}

export const adminShowAllListThunk = () => async dispatch => {
    var res = await axios.get(`${process.env.REACT_APP_API_SERVER}/admin/showallworkers`);
    return res.data;
}

export const adminOneInfoThunk = (employee_id) => async dispatch => {
    var res = await axios.get(`${process.env.REACT_APP_API_SERVER}/admin/showone/${employee_id}`);
    console.log("adminOneInfoThunk:", res.data);
    return res.data;
}

export const adminOneCalendarThunk = (employee_id) => async dispatch => {
    var res = await axios.get(`${process.env.REACT_APP_API_SERVER}/admin/calendar/${employee_id}`);
    console.log("adminOneCalendarThunk:", res.data);
    return res.data;
}

export const adminAnnouncementHisThunk = () => async dispatch => {
    var res = await axios.get(`${process.env.REACT_APP_API_SERVER}/admin/announcement`);
    return res.data;
}

export const adminNewAncmThunk = (announcement, department_id) => async dispatch => {
    var res = await axios.post(`${process.env.REACT_APP_API_SERVER}/admin/announcement`, { announcement, department_id });
    console.log("adminNewAncmThunk:", res.data);
    // return res.data;
}

export const adminNewEmployeeThunk = (username, email, password, department_id, title, day_rate, start_date, fName, lName, alias, phone_number, address, gender, date_of_birth) => async dispatch => {
    //{"username", "email", "password", "department_id", "title", "day_rate", "start_date", "fName", "lName", "alias", "phone_number", "address", "gender", "date_of_birth"}
    var res = await axios.post(`${process.env.REACT_APP_API_SERVER}/admin/addnewemployee`, {});
    console.log("adminNewAncmThunk:", res.data);
    // return res.data;
}

export const adminScanerThunk = (employee_id, in_time, date) => async dispatch => {
    axios.post(`${process.env.REACT_APP_API_SERVER}/admin/punchin`,
        { employee_id, in_time, date }).then(response => {
            if (response.data === null) {
                console.log('Login failed');
            }
            else {
                console.log("response.data:", response.data)
            }
        })
}

export const adminDelCalendarRecordThunk = (employee_id, work_date) => async dispatch => {
    console.log("employee_id, date:", employee_id, work_date);
    await axios.delete(`${process.env.REACT_APP_API_SERVER}/admin/calendar/${employee_id}`, { data: { work_date } }).then(response => {
        if (response.data === null) {
            console.log('No Calendar Record');
        }
        else {
            console.log("response.data:", response.data);
        }
    })
}

export const adminAddCalendarRecordThunk = (employee_id, date, status) => async dispatch => {
    var out_time = status === "FULL_DAY" ? "18:00:00" : "13:00:00";
    var day_working_hour = status === "FULL_DAY" ? "09:00:00" : "04:00:00";
    await axios.post(`${process.env.REACT_APP_API_SERVER}/admin/calendar`,
        { employee_id, in_time: "09:00:00", out_time, day_working_hour, date, status })
        .then(response => {
            if (response.data === null) {
                console.log('No Calendar Record');
            }
            else {
                console.log("response.data:", response.data);
            }
        })
}

export const adminPWThunk = (user_id, password) => async dispatch => {
    var res = await axios.post(`${process.env.REACT_APP_API_SERVER}/admin/checkpw`, { id: user_id, password });
    return res.data;
}

export const employeeLoginThunk = (username, password) => async dispatch => {
    axios.post(`${process.env.REACT_APP_API_SERVER}/employee/login`,
        { username, password }).then(async response => {
            if (response.data === null) {
                console.log('Login failed');
            }
            else {
                localStorage.setItem('TOKEN', response.data.token);
                await dispatch(login("employee"));
                await dispatch(setEmployeeID(decode().id));
            }
        })
}

export const employeePunchOutThunk = (employee_id, out_time) => async dispatch => {
    //handle 'daily_attendance' table
    var employee_data = await axios.get(`${process.env.REACT_APP_API_SERVER}/employee/punch/${employee_id}`);
    if (employee_data.data === undefined || employee_data.data === null || employee_data.data === "") {
        return false;
    }
    var in_time = employee_data.data.in_time;

    var status = "FULL_DAY";

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

        //assume that the full-day working hour is 9 hours
        if (hours < 4.5) {
            status = "HALF_DAY";
        } else if (hours >= 4.5) {
            status = "FULL_DAY";
        } else {
            status = "ABSENT";
        }

        return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes + ":" + (seconds <= 9 ? "0" : "") + seconds;
    }

    var id = employee_data.data.id;
    await axios.put(`${process.env.REACT_APP_API_SERVER}/employee/punchout`,
        { id, out_time, day_working_hour: diff(in_time, out_time), status }).then(response => {
            if (response.data === null) {
                console.log('Login failed');
            }
            else {
                console.log("response.data:", response.data);
                //notification: punch-out successed
            }
        })

    //handle 'salary' table
    var salary = await axios.get(`${process.env.REACT_APP_API_SERVER}/employee/day_rate/${employee_id}`);
    var daily_salary = 0;
    if (status === "HALF_DAY") {
        daily_salary = salary.data.day_rate * 0.5
    } else { daily_salary = salary.data.day_rate; }

    const getCurrentDate = () => {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        return date;
    }
    await axios.post(`${process.env.REACT_APP_API_SERVER}/employee/day_rate`, { employee_id, day_rate: salary.data.day_rate, work_status: status, work_date: getCurrentDate(), daily_salary });

    return true;
}

export const employeeGetCalendarRecordThunk = (id) => async dispatch => {
    var eventList = [];
    await axios.get(`${process.env.REACT_APP_API_SERVER}/employee/calendar/${id}`).then(response => {
        if (response.data === null) {
            console.log('No Calendar Record');
        }
        else {
            console.log("response.data:", response.data);
            response.data.map(e => {
                return eventList.push({ name: e.status, date: `${e.date}`, allDay: true })
            })
        }
    })
    console.log("eventList:", eventList)
    return eventList;
}

export const employeeGetInfoThunk = (employee_id) => async dispatch => {
    var data = await axios.get(`${process.env.REACT_APP_API_SERVER}/employee/personal_info/${employee_id}`)
    return data;
}

export const employeeGetEstatementThunk = (employee_id) => async dispatch => {
    var data = await axios.get(`${process.env.REACT_APP_API_SERVER}/employee/estatement/${employee_id}`)
    return data;
}

//for development
export const logoutThunk = () => dispatch => {
    localStorage.removeItem('TOKEN');
    dispatch(logout());
}
export default authSlice.reducer