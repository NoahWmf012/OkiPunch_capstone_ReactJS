import React from "react";
// import "./SideBar.css";
import SideBarOption from "./SideBarOption.jsx";
import LinkIcon from "@material-ui/icons/Link";
import HomeIcon from "@material-ui/icons/Home"
import { Link, Outlet } from "react-router-dom";

export default function SideBar() {
    return (
        <div className="sidebar" >
            <Link to={"/punch"}>
                <SideBarOption Icon={HomeIcon} title="Punch-in" />
            </Link>
            <Link to={"/calendar/:id"}>
                <SideBarOption Icon={LinkIcon} title="Calendar" />
            </Link>
            <Link to={"/personalinfo/:id"}>
                <SideBarOption Icon={LinkIcon} title="Information" />
            </Link>
            <Link to={"/estatement/:id"}>
                <SideBarOption Icon={LinkIcon} title="e-Statement" />
            </Link>
            <Outlet />
        </div>
    )
}