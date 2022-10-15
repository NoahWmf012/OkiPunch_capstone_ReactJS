import React from "react";
// import "./EmSideBar.css";
import SideBarOption from "./SideBarOption.jsx";
import CropFreeIcon from '@material-ui/icons/CropFree';
import TodayIcon from '@material-ui/icons/Today';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { Link } from "react-router-dom";

export default function EmSideBar() {
    return (
        <div className="sidebar" >
            <Link to={"/employee/punch"}>
                <SideBarOption Icon={CropFreeIcon} title="Punch-in" />
            </Link>
            <Link to={`/employee/calendar`}>
                <SideBarOption Icon={TodayIcon} title="Calendar" />
            </Link>
            <Link to={`/employee/personalinfo`}>
                <SideBarOption Icon={PermIdentityIcon} title="Information" />
            </Link>
            <Link to={`/employee/estatement`}>
                <SideBarOption Icon={MonetizationOnIcon} title="e-Statement" />
            </Link>
        </div>
    )
}