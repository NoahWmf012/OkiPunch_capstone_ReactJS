import React from "react";
// import "./EmSideBar.css";
import SideBarOption from "./SideBarOption.jsx";
import LinkIcon from "@material-ui/icons/Link";
import HomeIcon from "@material-ui/icons/Home"
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

export default function EmSideBar() {
    // const id = useSelector((state) => state.authStore.id)
    return (
        <div className="sidebar" >
            <Link to={"/employee/punch"}>
                <SideBarOption Icon={HomeIcon} title="Punch-in" />
            </Link>
            <Link to={`/employee/calendar`}>
                <SideBarOption Icon={LinkIcon} title="Calendar" />
            </Link>
            <Link to={`/employee/personalinfo`}>
                <SideBarOption Icon={LinkIcon} title="Information" />
            </Link>
            <Link to={`/employee/estatement`}>
                <SideBarOption Icon={LinkIcon} title="e-Statement" />
            </Link>
        </div>
    )
}