import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { employeeGetInfoThunk } from "../../redux/authSlice";

export default function EmPersonalInfo() {
    const [info, setInfo] = useState({});
    const dispatch = useDispatch();
    const id = useSelector((state) => state.authStore.id);

    useEffect(() => {
        dispatch(employeeGetInfoThunk(id)).then((res) => {
            setInfo(res.data);
        })
    }, [dispatch, id]);
    console.log(info);

    return (
        <div>
            EmPersonalInfo
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
