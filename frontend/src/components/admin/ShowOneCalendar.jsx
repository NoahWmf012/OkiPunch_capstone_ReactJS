import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { employeeGetCalendarRecordThunk, adminPWThunk, adminAddCalendarRecordThunk, adminDelCalendarRecordThunk } from "../../redux/authSlice";
import RevoCalendar from "revo-calendar";
import { ToastContainer, toast } from 'react-toastify';
import "./Modal.scss";

export default function ShowOneCalendar() {
    const [eventList, setEventList] = useState([]);
    const dispatch = useDispatch();
    const location = useLocation();
    const { employee_id } = location.state;
    const id = useSelector((state) => state.authStore.id);

    const [addModal, setAddModal] = useState(false);
    const [delModal, setDelModal] = useState(false);
    const [password, setPassword] = useState();
    const [item, setItem] = useState();
    const [workStatus, setWorkStatus] = useState('HALF_DAY');
    const [date, setDate] = useState(Date.now());

    useEffect(() => {
        dispatch(employeeGetCalendarRecordThunk(employee_id)).then((res) => {
            setEventList(res);
        });
    }, [dispatch, employee_id]);

    function deleteEvent(i) {
        setDelModal(true)
        setItem(i);
    }

    function addEvent() {
        setAddModal(true);
    }

    //for notification
    const notify = () => toast.error('Incorrect Username or Password', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

    return (
        <div>
            <h3 style={{ textAlign: "center" }}>Employee ID: {employee_id}</h3>
            <RevoCalendar
                events={eventList}
                sidebarWidth={100}
                detailWidth={100}
                allowDeleteEvent={true}
                allowAddEvent={true}
                deleteEvent={deleteEvent}
                addEvent={addEvent} />

            {delModal && (
                <div style={{ zIndex: 99, position: "relative", bottom: "20em" }}>
                    <div onClick={() => { setDelModal(!delModal) }} className="overlay" ></div>
                    <form className="calendar-modal-content" onSubmit={(e) => {
                        e.preventDefault();
                        dispatch(adminPWThunk(id, password)).then((res) => {
                            if (res === true) {
                                dispatch(adminDelCalendarRecordThunk(employee_id, eventList[item].date));
                                var temp = eventList;
                                temp.splice(item, 1);
                                setEventList(temp);
                                setDelModal(!delModal);
                            } else {
                                notify()
                            }
                        })
                    }}>
                        <h2>Enter your admin password to confirm</h2>
                        <label className="miniinput modal-input">
                            <input className="miniinput__field" type="password" placeholder=" " onChange={(e) => setPassword(e.currentTarget.value)} />
                            <span className="miniinput__label">Password</span>
                        </label>

                        <button type='submit'>
                            Submit
                        </button>
                    </form>
                </div>
            )}

            {addModal && (
                <div style={{ zIndex: 99, position: "relative", bottom: "20em" }}>
                    <div onClick={() => setAddModal(!addModal)} className="overlay" ></div>
                    <form className="calendar-modal-content" onSubmit={(e) => {
                        e.preventDefault();
                        dispatch(adminPWThunk(id, password)).then((res) => {
                            if (res === true) {
                                var newEvent = {
                                    name: workStatus,
                                    date: new Date(date),
                                    allDay: true,
                                };
                                dispatch(adminAddCalendarRecordThunk(employee_id, newEvent.date, newEvent.name));
                                var temp = eventList;
                                temp.push(newEvent);
                                setEventList([...temp]);
                                setAddModal(!addModal);
                            } else {
                                notify()
                            }
                        })
                    }
                    }>
                        <h2>Input Data and your admin password to confirm</h2>
                        <label className="miniinput">
                            <select value={workStatus} onChange={(e) => setWorkStatus(e.target.value)}>
                                <option value="FULL_DAY">FULL DAY</option>
                                <option value="HALF_DAY">HALF DAY</option>
                            </select>
                        </label>
                        <label className="miniinput modal-input">
                            <input className="miniinput__field" type="date" placeholder=" " onChange={(e) => setDate(e.currentTarget.value)} />
                        </label>
                        <label className="miniinput modal-input">
                            <input className="miniinput__field" type="password" placeholder=" " onChange={(e) => setPassword(e.currentTarget.value)} />
                            <span className="miniinput__label">Password</span>
                        </label>

                        <button type='submit'>
                            Submit
                        </button>
                    </form>
                </div>
            )}

            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}
