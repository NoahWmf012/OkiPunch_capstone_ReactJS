import React from 'react';
import QRCode from 'qrcode';
import { useSelector, useDispatch } from "react-redux";
import { employeePunchOutThunk } from '../../redux/authSlice'

export default function EmPunch() {
    const dispatch = useDispatch();

    const id = useSelector((state) => state.authStore.id);
    console.log("id:", id)

    const getCurrentTime = () => {
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        return time;
    }

    const getCurrentDate = () => {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        return date;
    }

    var segs = [
        { employee_id: id, in_time: getCurrentTime(), date: getCurrentDate() }
    ]

    const genQRcode = () => {
        QRCode.toDataURL(JSON.stringify(segs), function (err, url) {
            if (err) return console.log(err);
            var img = document.getElementById('qrcode-image');
            img.src = url;
        })
    }

    return (
        <div>
            <h1>EmPunch</h1>
            <button onClick={() => genQRcode()}>Punch-in</button>
            <br />
            <img id='qrcode-image' src="" alt="" width="300" />

            <button onClick={() => dispatch(employeePunchOutThunk(id, getCurrentTime()))}>Punch-out</button>
        </div>
    )
}
