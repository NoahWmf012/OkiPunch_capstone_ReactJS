import React from 'react';
import QRCode from 'qrcode';
import { useSelector, useDispatch } from "react-redux";
import { employeePunchOutThunk } from '../../redux/authSlice'
import { ToastContainer, toast } from 'react-toastify';

export default function EmPunch() {
    const dispatch = useDispatch();
    const notify = () => toast.error('No Punch-in Record', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

    const notifySuc = () => toast.success('Successfully Punched-in!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

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
            <h1>Instructions:<br /></h1>
            <h3>Press Punch-in button to generate a QR code when you enter company.<br />
                Press Punch-out button when you leave company.</h3>

            <button onClick={() => genQRcode()}>Punch-in</button>
            <br />
            <img id='qrcode-image' src="" alt="" width="300" />
            <br />
            <button onClick={() => dispatch(employeePunchOutThunk(id, getCurrentTime()))
                .then((response) => response ? notifySuc() :
                    notify()
                )}>Punch-out</button>

            <ToastContainer
                position="top-center"
                autoClose={2000}
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
