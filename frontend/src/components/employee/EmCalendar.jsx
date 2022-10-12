import React, { useState, useEffect } from 'react';
import RevoCalendar from "revo-calendar";
import { useSelector, useDispatch } from "react-redux";
import { employeeGetCalendarRecordThunk } from "../../redux/authSlice";

export default function EmCalendar() {
    const [eventList, setEventList] = useState([]);
    const dispatch = useDispatch();
    const id = useSelector((state) => state.authStore.id)

    useEffect(() => {
        dispatch(employeeGetCalendarRecordThunk(id)).then((res) => {
            setEventList(prev => [...prev, ...res])
        });
    }, []);

    return (
        <div>
            <RevoCalendar
                events={eventList} />
        </div>
    )
}
