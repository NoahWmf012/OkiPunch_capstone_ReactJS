import React, { useState, useEffect } from 'react';
import { adminAnnouncementHisThunk, adminNewAncmThunk } from '../../redux/authSlice';
import { useDispatch } from "react-redux";

export default function Annoucement() {
    const [history, setHistory] = useState([]);
    const dispatch = useDispatch();
    const [announcement, setAnnouncement] = useState();
    const [department_id, setDepartment_id] = useState();

    useEffect(() => {
        dispatch(adminAnnouncementHisThunk()).then((res) => {
            setHistory(res);
        });
    }, [dispatch]);

    const handleSubmit = (e) => {
        // e.preventDefault();
        const formData = new FormData(e.target);
        const data = formData.entries();
        for (const entry of data) console.log(entry);
    };

    return (
        <div>
            <p>This is Annoucement</p>
            {history.length > 0 && history.map((e, val) => {
                return (
                    <div key={val}>{Object.keys(e).map((key, index) => {
                        return (
                            <div key={index}>
                                <h4>
                                    {key}: {e[key]}
                                </h4>

                                <hr />
                            </div>
                        );
                    })}</div>
                )
            })}
            <form className="card card--inverted" onSubmit={(e) => {
                e.preventDefault();
                // dispatch(adminNewAncmThunk(announcement, department_id))
                handleSubmit(e)
            }
            }>
                <h2>New Announcment</h2>
                <label className="input">
                    <input className="input__field" type="text" placeholder=" " onChange={(e) => setAnnouncement(e.currentTarget.value)} />
                    <span className="input__label">New Announcment</span>
                </label>
                <br />


                <label className="input">
                    <input className="input__field" type="checkbox" placeholder=" " value="Operating" name="department" onChange={(e) => setDepartment_id(e.currentTarget.value)} />
                    <span className="input__label">Operating</span>
                </label>

                <label className="input">
                    <input className="input__field" type="checkbox" placeholder=" " value="R&D" name="department" onChange={(e) => setDepartment_id(e.currentTarget.value)} />
                    <span className="input__label">R&D</span>
                </label>

                <label className="input">
                    <input className="input__field" type="checkbox" placeholder=" " value="Frontdesk" name="department" onChange={(e) => setDepartment_id(e.currentTarget.value)} />
                    <span className="input__label">Frontdesk</span>
                </label>

                <div className="button-group">
                    <button>Add new announcement</button>
                </div>
            </form >
        </div>
    )
}
