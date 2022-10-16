import React from 'react';
import { adminNewEmployeeThunk } from '../../redux/authSlice';
import { useDispatch } from "react-redux";

export default function AddNew() {
    const dispatch = useDispatch();
    return (
        <div>AddNew Page

            <form className="minicard minicard--inverted" onSubmit={(e) => {
                e.preventDefault();
                dispatch(adminNewEmployeeThunk())//username, email, password, department_id, title, day_rate, start_date, fName, lName, alias, phone_number, address, gender, date_of_birth
            }
            }>
                <h2>New Employee</h2>
                <label className="miniinput">
                    <input className="miniinput__field" type="text" placeholder=" " />
                    <span className="miniinput__label">New Announcment</span>
                </label>
                <br />


                <label className="miniinput">
                    <input className="miniinput__field" type="checkbox" placeholder=" " />
                    <span className="miniinput__label">Department</span>
                </label>

                <div className="button-group">
                    <button >Add new announcement</button>
                </div>
            </form >
        </div>
    )
}
