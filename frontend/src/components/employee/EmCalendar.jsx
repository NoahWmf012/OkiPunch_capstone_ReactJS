import React from 'react';
import { Outlet } from "react-router-dom";

export default function EmCalendar() {
    return (
        <div>This is EmCalendar
            <Outlet />
        </div>
    )
}
