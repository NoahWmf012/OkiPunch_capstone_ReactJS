import React from "react";
import SideBarOption from "./SideBarOption.jsx";
import CropFreeIcon from '@material-ui/icons/CropFree';
import TodayIcon from '@material-ui/icons/Today';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { Link } from "react-router-dom";

//Nav bar
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.css';

export default function EmSideBar() {
    return (
        <div>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="/employee/punch">
                        <CropFreeIcon />
                        Punch-in
                    </Navbar.Brand>
                    <Navbar.Brand href="/employee/calendar">
                        <TodayIcon />
                        Calendar
                    </Navbar.Brand>
                    <Navbar.Brand href="/employee/personalinfo">
                        <PermIdentityIcon />
                        Information
                    </Navbar.Brand>
                    <Navbar.Brand href="/employee/estatement">
                        <MonetizationOnIcon />
                        e-Statement
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    )
}