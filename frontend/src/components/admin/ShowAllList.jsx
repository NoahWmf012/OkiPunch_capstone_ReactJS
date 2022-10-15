import React, { useEffect, useState } from 'react';
import { adminShowAllListThunk } from '../../redux/authSlice';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from './SearchBar';

export default function ShowAllList() {
    const dispatch = useDispatch();
    const [list, setList] = useState([]);
    const [searchTerm, setSearchTerm] = useState();
    useEffect(() => {
        dispatch(adminShowAllListThunk()).then((e) => {
            setList(e);
        })
    }, [dispatch])
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
                return (<div key={e.employee_id}>

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
                        <button>Calendar</button>
                    </Link>

                    <Link to="/admin/showoneinfo" state={{ employee_id: e.employee_id }}>
                        <button>Personal Info</button>
                    </Link>

                    <Link to="/admin/adestatement" state={{ employee_id: e.employee_id }}>
                        <button>E-statement</button>
                    </Link>
                    <br />
                    <br />
                    <br />
                </div>)
            })}
        </div >
    )
}
