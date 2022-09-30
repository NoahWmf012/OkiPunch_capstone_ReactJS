import React from 'react';
import { Outlet } from "react-router-dom";

export default function EmCalendar() {
    console.log("Loading EmCalendar")
    return (
        <div>This is EmCalendar
            <Outlet />
        </div>
    )
}
