import React, { useState, useEffect } from 'react';
import QrReader from 'react-qr-scanner';
import { Grid } from '@material-ui/core';
import { adminScanerThunk } from "../../redux/authSlice";
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function QrScanner() {

    const notify = () => toast('Punch-in Succeed!', {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    const dispatch = useDispatch();

    const [scanResultWebCam, setScanResultWebCam] = useState('');
    useEffect(() => {
        if (scanResultWebCam) {
            var ps = JSON.parse(scanResultWebCam.text)
            dispatch(adminScanerThunk(ps[0].employee_id, ps[0].in_time, ps[0].date)).then(() => notify())
        }
    }, [scanResultWebCam, dispatch]);

    const handleErrorWebCam = (error) => {
        console.log(error);
    }
    const handleScanWebCam = (result) => {
        if (result) {
            setScanResultWebCam(result);
        }
    }

    return (
        <div>
            <h1>QR Code Reader</h1>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                <QrReader
                    delay={2500}
                    style={{ width: '100%' }}
                    onError={handleErrorWebCam}
                    onScan={handleScanWebCam}
                />
            </Grid>

            <ToastContainer
                position="top-center"
                autoClose={2500}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}
