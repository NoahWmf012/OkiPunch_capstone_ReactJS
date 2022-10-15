import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { employeeGetCalendarRecordThunk, adminPWThunk } from "../../redux/authSlice";
import RevoCalendar from "revo-calendar";
import { ToastContainer, toast } from 'react-toastify';
import "./Modal.css";

export default function ShowOneCalendar() {
    const [eventList, setEventList] = useState([]);
    const dispatch = useDispatch();
    const location = useLocation();
    const { employee_id } = location.state;
    const id = useSelector((state) => state.authStore.id);
    console.log("eventList:", eventList);

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

    //for modal
    const [modal, setModal] = useState(false);
    const [type, setType] = useState(1);
    const [password, setPassword] = useState();
    const [item, setItem] = useState();
    const [workStatus, setWorkStatus] = useState('HALF_DAY');
    const [date, setDate] = useState(Date.now());
    const toggleModal = (_type) => {
        setModal(!modal);
        setType(_type);
    };
    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    useEffect(() => {
        dispatch(employeeGetCalendarRecordThunk(employee_id)).then((res) => {
            setEventList(res);
        });
    }, [dispatch, employee_id]);

    function deleteEvent(i) {
        toggleModal(1);
        setItem(i);
        console.log("i:", i)
    }

    function addEvent() {
        toggleModal(2);
    }
    return (
        <div>
            <RevoCalendar
                events={eventList}
                sidebarWidth={100}
                detailWidth={100}
                allowDeleteEvent={true}
                allowAddEvent={true}
                deleteEvent={deleteEvent}
                addEvent={addEvent} />

            {//for delete data
                modal && type === 1 && (
                    <div className="modal" style={{ zIndex: 99 }}>
                        <div onClick={toggleModal} className="overlay" ></div>
                        <form className="modal-content" onSubmit={(e) => {
                            e.preventDefault();
                            dispatch(adminPWThunk(id, password)).then((res) => {
                                if (res === true) {
                                    var temp = eventList
                                    temp.splice(item, 1)
                                    setEventList(temp)
                                    toggleModal();
                                } else {
                                    notify()
                                }
                            })
                        }
                        }>
                            <h2>Enter your admin password to confirm</h2>
                            <label className="input">
                                <input className="input__field" type="password" placeholder=" " onChange={(e) => setPassword(e.currentTarget.value)} />
                                <span className="input__label">Password</span>
                            </label>

                            <button type='submit'>
                                Submit
                            </button>
                        </form>
                    </div>
                )}

            {//for add data
                modal && type === 2 && (
                    <div className="modal" style={{ zIndex: 99 }}>
                        <div onClick={toggleModal} className="overlay" ></div>
                        <form className="modal-content" onSubmit={(e) => {
                            e.preventDefault();
                            dispatch(adminPWThunk(id, password)).then((res) => {
                                if (res === true) {
                                    //add data
                                    var newEvent = {
                                        name: workStatus,
                                        date: new Date(date),
                                        allDay: true,
                                    };
                                    var temp = eventList;
                                    temp.push(newEvent);
                                    setEventList([...temp]);
                                    toggleModal();
                                } else {
                                    notify()
                                }
                            })
                        }
                        }>
                            <h2>Input Data and your admin password to confirm</h2>
                            <label className="input">
                                <select value={workStatus} onChange={(e) => setWorkStatus(e.target.value)}>
                                    <option value="FULL_DAY">FULL DAY</option>
                                    <option value="HALF_DAY">HALF DAY</option>
                                </select>
                            </label>
                            <label className="input">
                                <input className="input__field" type="date" placeholder=" " onChange={(e) => setDate(e.currentTarget.value)} />
                            </label>
                            <label className="input">
                                <input className="input__field" type="password" placeholder=" " onChange={(e) => setPassword(e.currentTarget.value)} />
                                <span className="input__label">Password</span>
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
