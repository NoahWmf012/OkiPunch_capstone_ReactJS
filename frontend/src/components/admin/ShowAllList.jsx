import React, { useEffect, useState } from 'react';
import { adminShowAllListThunk } from '../../redux/authSlice';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from './SearchBar';
import { Card } from 'react-bootstrap'

export default function ShowAllList() {
    const dispatch = useDispatch();
    const [list, setList] = useState([]);
    const [searchTerm, setSearchTerm] = useState();
    useEffect(() => {
        dispatch(adminShowAllListThunk()).then((e) => {
            setList(e);
        })
    }, [dispatch])

    const style = {
        color: "black",
        marginLeft: "2px"
    }

    return (
        <div>
            <SearchBar getData={(data) => {
                setSearchTerm(data);
            }} />

            {list.length > 0 && list.filter((val) => {
                if (searchTerm === "" || searchTerm === undefined) {
                    return val;
                } else if (val.department_name.toLowerCase().includes(searchTerm.toLowerCase()) || val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val;
                } else return false;
            }).map((e) => {
                return (
                    <div className='text-center d-flex justify-content-center mb-2 mt-1' key={e.employee_id}>
                        <Card style={{ width: '30rem' }} >
                            {Object.keys(e).map((key, index) => {
                                return (
                                    <div key={index}>
                                        <h4>
                                            {key}: {e[key]}
                                        </h4>
                                        <hr />
                                    </div>
                                );
                            })}

                            <Link to="/admin/showonecalendar" state={{ employee_id: e.employee_id }}>
                                <button style={style}>Calendar</button>
                            </Link>

                            <Link to="/admin/showoneinfo" state={{ employee_id: e.employee_id }}>
                                <button style={style}>Personal Info</button>
                            </Link>

                            <Link to="/admin/adestatement" state={{ employee_id: e.employee_id }}>
                                <button style={style}>E-statement</button>
                            </Link>
                        </Card>
                    </div>
                )
            })}
        </div >
    )
}
