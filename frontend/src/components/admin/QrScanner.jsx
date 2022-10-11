import React, { useState, useEffect } from 'react';
import QrReader from 'react-qr-scanner'
import { Grid } from '@material-ui/core';
import { adminScanerThunk } from "../../redux/authSlice";
import { useDispatch } from 'react-redux'

export default function QrScanner() {

    const dispatch = useDispatch();

    const [scanResultWebCam, setScanResultWebCam] = useState('');
    useEffect(() => {
        if (scanResultWebCam) {
            var ps = JSON.parse(scanResultWebCam.text)
            dispatch(adminScanerThunk(ps[0].employee_id, ps[0].in_time, ps[0].date))
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
            <h1>QRReader</h1>
            <h3>Qr Code Scan by Web Cam</h3>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                <QrReader
                    delay={300}
                    style={{ width: '100%' }}
                    onError={handleErrorWebCam}
                    onScan={handleScanWebCam}
                />
            </Grid>


        </div>
    )
}
