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
import emailjs from '@emailjs/browser';
import Footer from '../Footer';
var CryptoJS = require("crypto-js");

export default function Student_Dashboard() {
    const history = useHistory()
    const testCode = useRef();
    const [testcode, settestcode] = useState();
    const [examdetails, setexamdetails] = useState(null);
    const [details, setDetails] = useState();
    const [photo, setPhoto] = useState();
    const [displayform, setDisplayform] = useState(true);
    const { logout, currentUser } = useAuth();
    async function getDetails() {
        var student_details = firebase.database().ref('Students/' + currentUser.uid);
        await student_details.on('value', (snapshot) => {
            setDetails(snapshot.val())
            // console.log(snapshot.val())
            const img_b = snapshot.val().Photo
            // console.log(img_b);
            setPhoto(img_b)
        })
    }
    async function leave() {
        try {
            await logout();
            history.push('/')
        } catch (e) {
            alert('Failed to Logout')
            // console.log(e)
        }
    }

    const direct = () => {
        const code = testCode.current.value.replaceAll('@', '/');
        settestcode(code);
        var bytes = CryptoJS.AES.decrypt(code, 'my-secret-key@123');
        // console.log(bytes.toString(CryptoJS.enc.Utf8))
        var ref = firebase.database().ref(bytes.toString(CryptoJS.enc.Utf8));
        try {
            ref.on('value', (snap) => {
                const data = snap.val();
                alert("Read the Instruction carefully")
                setexamdetails(data);
                setDisplayform(false)
            })
        } catch (error) {
            alert("Invalid test code")
            // console.log(error)
        }
        // console.log(code, name, pic);

    }

    const registerStudents = () => {
        const key = testcode;
        var bytes = CryptoJS.AES.decrypt(key, 'my-secret-key@123');
        var url = bytes.toString(CryptoJS.enc.Utf8);
        const testRef = firebase.database().ref(url);
        let students;
        testRef.on('value', (snapshot) => {
            const data = snapshot.val();
            students = data.students;
        });
        if (students == "None") {
            students = currentUser.uid;
            alert(students)
            var ciphertext = CryptoJS.AES.encrypt(students, 'my-secret-key@123').toString();
            testRef.on('value', (snapshot) => {
                const data = snapshot.val();
                data.students = ciphertext;
                testRef.set(data)
                changeServer();
            });
        }
        else {
            students = CryptoJS.AES.decrypt(students, 'my-secret-key@123');
            students = students.toString(CryptoJS.enc.Utf8)

            let studentArr = students.split(",");
            if (studentArr.indexOf(currentUser.uid) === -1) {
                studentArr.push(currentUser.uid);
            }
            students = "";
            for (let i = 0; i < studentArr.length; i++) {
                students += studentArr[i];
                if (i < (studentArr.length - 1))
                    students += ',';
            }
            var ciphertext = CryptoJS.AES.encrypt(students, 'my-secret-key@123').toString();
            testRef.on('value', (snapshot) => {
                const data = snapshot.val();
                data.students = ciphertext;
                testRef.set(data)
                changeServer();
            });
        }

    }

    const start = () => {
        var test_details = firebase.database().ref('Students/' + currentUser.uid + '/Tests/' + examdetails.test_key);
        const student_test_data = {
            fullScreen: 0,
            tabs_changed: 0,
            terminate: 0
        }
        test_details.set(student_test_data)
        registerStudents();
    }
    const changeServer = () => {
        const code = testcode.replaceAll('/', '@');
        const obj = {
            studentref: currentUser.uid
        }
        fetch("http://localhost:4000/post", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(obj)
        }).then(res => {
            let str = `http://localhost:4000/face/${code}`
            window.location.assign(str)
        })
    }
    const notifyMe = () => {
        const obj = {
            test_name: examdetails.test_name,
            test_time: examdetails.test_time,
            test_date: examdetails.test_date,
            test_duration: examdetails.test_duration,
            test_key: examdetails.test_key,
            user_name: details.Student_Name,
            user_email: details.Email
        }
        emailjs.send('service_3zd807n', 'template_z0wuz5m', obj, 'user_0nQqZkKHNAxpAJBXyIs7O').then((result) => {
            // console.log(result.text);
        }, (error) => {
            // console.log(error.text);
        });
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
                        <br />
                        {examdetails && <>
                            <Card sx={{ maxWidth: 500 }} style={{ padding: "1.5rem" }} >
                                <Typography variant="h3" component="h3" style={{ color: "#141718" }}>
                                    <b>Test Details</b>
                                </Typography>
                                <br />
                                <Typography variant="h5" component="h5" style={{ color: "#141718" }}>
                                    Test Name: {examdetails.test_name}
                                </Typography>
                                <br />
                                <Typography variant="h5" component="h5" style={{ color: "#141718" }}>
                                    Test Date: {examdetails.test_date}
                                </Typography>
                                <br />
                                <Typography variant="h5" component="h5" style={{ color: "#141718" }}>
                                    Test Time: {examdetails.test_time}
                                </Typography>
                                <br />
                                <Typography variant="h5" component="h5" style={{ color: "#141718" }}>
                                    Test Duration : <b style={{ color: "#ffbf00" }}>{examdetails.test_duration} minutes</b>.
                                </Typography>
                                <Button variant="contained" style={{ backgroundColor: "#6062ff", margin: "1%" }} onClick={notifyMe} >Notify Me</Button>
                                <br /><br />
                                <Typography variant="h3" component="h3" style={{ color: "#141718" }}>
                                    <b>Instructions</b>
                                </Typography>
                                <br />1. You must use a functioning webcam and microphone
                                <br />2. No cell phones or other secondary devices in the room or test area
                                <br />3. Your desk/table must be clear or any materials except your test-taking device
                                <br />4. No one else can be in the room with you
                                <br />5. No talking
                                <br />6. The testing room must be well-lit and you must be clearly visible
                                <br />7. No dual screens/monitors
                                <br />8. Do not leave the camera
                                <br />9. No use of additional applications or internet
                                <br /><Button variant="contained" style={{ backgroundColor: "#6062ff", margin: "2%" }} onClick={start} >Start Test</Button>
                            </Card>
                        </>}
                        {!examdetails && <>
                            <Typography variant="h3" component="h3" style={{ color: "white" }}>
                                &nbsp; &nbsp; Hey! {details && details.Student_Name}
                            </Typography>
                            <br />
                            <img src={photo} style={{ height: "60%", borderRadius: "5%", marginLeft: "4%" }} />
                        </>
                        }

                    </Grid>
                    <Grid item xs={6}>
                        <br /><br /><br /><br />
                        {details && displayform && <Card sx={{ maxWidth: 500 }} style={{ padding: "1.5rem" }}>
                            <Typography variant="h4" component="h4" style={{ color: "#141718" }}>
                                Enter a valid test code  <br />
                            </Typography>
                            <TextField id="outlined-basic" label="Test Code" variant="outlined" inputRef={testCode} fullWidth sx={{ m: 1 }}></TextField>

                            <Button variant="contained" style={{ backgroundColor: "#6062ff", margin: "2%" }} onClick={direct} >Submit</Button>
                        </Card>
                        }
                    </Grid>
                </Grid>
            </Box>
            <br /><br />
            {/* <Footer /> */}
        </>
    )
}
