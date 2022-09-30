import React from "react";
import "./SideBar.css";
import SideBarOption from "./SideBarOption.jsx";
import LinkIcon from "@material-ui/icons/Link";
import HomeIcon from "@material-ui/icons/Home"
import { Link } from "react-router-dom";

export default function SideBar() {
    return (
        <div className="sidebar" >
            <Link to={"/admin/addnew"}>
                <SideBarOption Icon={HomeIcon} title="Add New Employee" />
            </Link>
            <Link to={"/admin/announcement"}>
                <SideBarOption Icon={LinkIcon} title="Announcement" />
            </Link>
            <Link to={"/admin/showallemployee"}>
                <SideBarOption Icon={LinkIcon} title="Employee List" />
            </Link>
            <Link to={"/admin/qrreader"}>
                <SideBarOption Icon={LinkIcon} title="Punch-in" />
            </Link>
        </div>
    )
}