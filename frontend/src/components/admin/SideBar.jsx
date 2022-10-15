import React from "react";
import "./SideBar.css";
import SideBarOption from "./SideBarOption.jsx";
// import HomeIcon from "@material-ui/icons/Home"
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import CropFreeIcon from '@material-ui/icons/CropFree';
import { Link } from "react-router-dom";

export default function SideBar() {
    return (
        <div className="sidebar" >
            {/* <Link to={"/admin/addnew"}>
                <SideBarOption Icon={HomeIcon} title="Add New Employee" />
            </Link> */}
            <Link to={"/admin/announcement"}>
                <SideBarOption Icon={AssignmentLateIcon} title="Announcement" />
            </Link>
            <Link to={"/admin/showallemployee"}>
                <SideBarOption Icon={AssignmentIndIcon} title="Employee List" />
            </Link>
            <Link to={"/admin/qrreader"}>
                <SideBarOption Icon={CropFreeIcon} title="Punch-in" />
            </Link>
        </div>
    )
}