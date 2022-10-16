import React from "react";
import SideBarOption from "./SideBarOption.jsx";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import CropFreeIcon from '@material-ui/icons/CropFree';
import { Link } from "react-router-dom";

//Nav bar
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css';

export default function SideBar() {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    {/* <Navbar.Brand href="/admin/addnew">
                        <AssignmentLateIcon />
                        Add New Employee
                    </Navbar.Brand>
                    <Navbar.Brand href="/admin/announcement">
                        <AssignmentLateIcon />
                        Announcement
                    </Navbar.Brand> */}
                    <Navbar.Brand href="/admin/showallemployee">
                        <AssignmentIndIcon />
                        Employee List
                    </Navbar.Brand>
                    <Navbar.Brand href="/admin/qrreader">
                        <CropFreeIcon />
                        Punch-in Scanner
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    )
}