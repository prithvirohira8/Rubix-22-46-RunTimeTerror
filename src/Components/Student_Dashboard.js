import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import logo from '../logo.jpg';
import { useHistory } from "react-router-dom"
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import firebase from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import Webcam from 'react-webcam';
var CryptoJS = require("crypto-js");

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export default function Student_Dashboard() {
    const history = useHistory()
    const testCode = useRef();
    const [examdetails, setexamdetails] = useState(null);
    const [details, setDetails] = useState();
    const [display, setDisplay] = useState(false);
    const { logout, currentUser } = useAuth();
    async function getDetails() {
        var student_details = firebase.database().ref('Students/' + currentUser.uid);
        await student_details.on('value', (snapshot) => {
            setDetails(snapshot.val())
            console.log(snapshot.val())
            setDisplay(true);
        })
    }
    async function leave() {
        try {
            await logout();
            history.push('/')
        } catch (e) {
            alert('Failed to Logout')
            console.log(e)
        }
    }

    const direct = () => {
        const code = testCode.current.value;
        var bytes = CryptoJS.AES.decrypt(code, 'my-secret-key@123');
        console.log(bytes.toString(CryptoJS.enc.Utf8))
        var ref = firebase.database().ref(bytes.toString(CryptoJS.enc.Utf8));


        try {
            ref.on('value', (snap) => {
                const data = snap.val();
                alert("Read the Instruction carefully")
                setexamdetails(data);
            })
        } catch (error) {
            alert("Invalid test code")
            console.log(error)
        }
        // console.log(code, name, pic);

    }

    const start = () => {
        const code = testCode.current.value;
        var bytes = CryptoJS.AES.decrypt(code, 'my-secret-key@123');
        console.log(bytes.toString(CryptoJS.enc.Utf8))
        const obj = {
            studentref: currentUser.uid,
            testref: bytes.toString(CryptoJS.enc.Utf8)
        }

        fetch("http://localhost:4000/post", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(obj)
        }).then(res => {
            // fetch("http://localhost:4000/123")
            window.location.assign('http://localhost:4000/face')
        })
    }

    useEffect(() => {
        getDetails();
    }, []);
    return (
        <>
            <AppBar position="static" style={{ backgroundColor: "black" }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            <img src={logo} style={{ borderRadius: "50%", width: "15%", height: "15%" }} />
                        </Typography>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                        >
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Logout">
                                <Button variant="contained" style={{ backgroundColor: "#6062ff", margin: "10%" }} onClick={leave}>Logout</Button>
                            </Tooltip>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <br /><br /><br />
                        {examdetails && <Typography variant="h2" component="h2" style={{ color: "white" }}>
                            &nbsp; &nbsp;Test details<br /><br />
                            &nbsp; &nbsp;Test name : {examdetails.test_name}
                            &nbsp; &nbsp;Duration : {examdetails.test_duration} minutes
                            &nbsp; &nbsp;{examdetails.test_time}
                            &nbsp; &nbsp;Instructions<br /><br />
                        </Typography>}
                        {!examdetails && <Typography variant="h2" component="h2" style={{ color: "white" }}>
                            &nbsp; &nbsp; Hey! {display && details.Student_Name}
                        </Typography>}


                        { }
                    </Grid>
                    <Grid item xs={6}>
                        <br /><br /><br />
                        <Typography variant="h2" component="h2" style={{ color: "white" }}>
                            &nbsp; &nbsp;
                            <TextField style={{ backgroundColor: "white" }} inputRef={testCode}></TextField>
                            <Button variant="contained" style={{ backgroundColor: "#6062ff", margin: "10%" }} onClick={direct} >Register</Button>
                            {examdetails && <Button variant="contained" style={{ backgroundColor: "#6062ff", margin: "10%" }} onClick={start} >Start Test</Button>}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
