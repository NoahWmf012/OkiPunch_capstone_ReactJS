import React, { useState, useEffect } from 'react';
import { employeeGetEstatementThunk } from '../../redux/authSlice';
import { useSelector, useDispatch } from "react-redux";
import { Card } from 'react-bootstrap'

export default function EmEstatement() {
    const [estatment, setEstatment] = useState([]);
    const dispatch = useDispatch();
    const id = useSelector((state) => state.authStore.id);
    useEffect(() => {
        dispatch(employeeGetEstatementThunk(id)).then((res) => {
            setEstatment(res.data)
        });
    }, [dispatch, id]);
    return (
        <div className='text-center d-flex justify-content-center mb-2 mt-1'>
            <Card style={{ width: '30rem' }} >
                {Object.keys(estatment).map((key, index) => {
                    return (
                        <div key={index}>
                            <h4>
                                {key}: {estatment[key]}
                            </h4>
                        </div>
                    );
                })}
            </Card>
        </div>
    )
}
