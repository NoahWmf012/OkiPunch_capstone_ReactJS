import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { employeeGetEstatementThunk } from '../../redux/authSlice'
import { Card } from 'react-bootstrap'

export default function EStatement() {

    const [info, setInfo] = useState([]);
    const dispatch = useDispatch();
    const location = useLocation();
    const { employee_id } = location.state;

    useEffect(() => {
        dispatch(employeeGetEstatementThunk(employee_id)).then((res) => {
            setInfo(res.data)
        });
    }, [dispatch, employee_id]);
    return (
        <div className='text-center d-flex justify-content-center mb-2 mt-1'>
            <Card style={{ width: '30rem' }} >
                {Object.keys(info).map((key, index) => {
                    return (
                        <div key={index}>
                            <h4>
                                {key}: {info[key]}
                            </h4>
                        </div>
                    );
                })}
            </Card>
        </div>
    )
}
