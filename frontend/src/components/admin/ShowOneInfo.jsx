import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { employeeGetInfoThunk } from "../../redux/authSlice";

export default function ShowOneInfo() {
    const [info, setInfo] = useState([]);
    const dispatch = useDispatch();
    const location = useLocation();
    const { employee_id } = location.state;

    useEffect(() => {
        dispatch(employeeGetInfoThunk(employee_id)).then((res) => {
            setInfo(res.data)
        });
    }, [dispatch, employee_id]);
    return (
        <div>ShowOneInfo
            {Object.keys(info).map((key, index) => {
                return (
                    <div key={index}>
                        <h4>
                            {key}: {info[key]}
                        </h4>

                        <hr />
                    </div>
                );
            })}
        </div>
    )
}
