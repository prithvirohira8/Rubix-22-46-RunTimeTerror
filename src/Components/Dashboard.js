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
import copy from "copy-to-clipboard";
import Footer from '../Footer';
var CryptoJS = require("crypto-js");

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export default function Dashboard() {
    const history = useHistory()
    const { logout, currentUser } = useAuth();
    const [details, setDetails] = useState({});
    const [Display, setDisplay] = useState(false);
    const [setting, setSetting] = useState(false);
    const [createTest, setcreateTest] = useState(false);
    const test_name = useRef();
    const test_format = useRef();
    const test_duration = useRef();
    const test_time = useRef();
    const test_date = useRef();
    const test_description = useRef();
    const test_link = useRef();
    const fsDetect = useRef();
    const tsDetect = useRef();

    async function getDetails() {
        var organization_details = firebase.database().ref('Organizations/' + currentUser.uid);
        await organization_details.on('value', (snapshot) => {
            const data = snapshot.val()
            setDetails(data)
            setDisplay(true);
        })

    }
    const scheduleTest = () => {
        setcreateTest(true)
    }

    const draftTest = () => {
        const d = Date.now();
        const testRef = firebase.database().ref('Organizations/' + currentUser.uid + '/Tests');
        var ciphertext = CryptoJS.AES.encrypt('Organizations/' + currentUser.uid + '/Tests' + '/' + d, 'my-secret-key@123').toString();
        const test_data = {
            test_name: test_name.current.value,
            test_format: test_format.current.value,
            test_duration: test_duration.current.value,
            test_time: test_time.current.value,
            test_date: test_date.current.value,
            test_description: test_description.current.value,
            test_link: test_link.current.value,
            test_key: ciphertext.replaceAll('/', '@'),
            fsDetects: parseInt(fsDetect.current.value, 10),
            tsDetects: parseInt(tsDetect.current.value, 10),
            students: "None"
        }
        console.log(ciphertext)
        var bytes = CryptoJS.AES.decrypt(ciphertext, 'my-secret-key@123');
        console.log(bytes.toString(CryptoJS.enc.Utf8))
        testRef.child(d).set(test_data);
        setcreateTest(false)
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
                            {Display && <>{details.Organization_Name}</>}
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Typography variant="h5">{Display && <>{details.Organization_Name}</>}</Typography>
                        </Box>
                        <Box sx={{ flexGrow: 0 }} >
                            <Tooltip title="Schedule a test">
                                <Button variant="contained" style={{ backgroundColor: "#6062ff" }} onClick={scheduleTest}>Schedule a test</Button>
                            </Tooltip>
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
                        &nbsp; &nbsp;
                        <br /> <br />
                        <Typography variant="h2" component="h2" style={{ color: "white" }}>
                            &nbsp; &nbsp;Tests Scheduled
                        </Typography>
                        {Display && details.Tests &&
                            Object.values(details.Tests).map((k, v) => {
                                return <>
                                    <Card sx={{ maxWidth: 500 }} style={{ margin: "6%", padding: "2%" }}>
                                        <Typography variant="h4" component="h4" style={{ color: "black" }}>&nbsp; {k.test_name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <i style={{ color: "grey", fontSize: "70%" }}>{k.test_date}</i></Typography>
                                        &nbsp;&nbsp; <Button variant="contained" onClick={() => copy(k.test_key)}>Copy Test Link</Button>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button variant="contained"
                                            onClick={() => {
                                                let str = `http://localhost:3000/Proctor/${k.test_key}`
                                                window.location.assign(str)
                                            }}>Proctor</Button>
                                    </Card>
                                </>
                            })
                        }
                    </Grid>
                    <Grid item xs={6}>
                        {createTest &&
                            <>
                                <br />
                                <Card sx={{ maxWidth: 500 }} style={{ padding: "1.5rem" }}>
                                    <Typography variant="h4" component="h4" style={{ color: "#141718" }}>
                                        Fill in the details  <br />
                                    </Typography>
                                    <TextField id="name" label="Test Name" variant="standard" inputRef={test_name} />
                                    &nbsp; &nbsp; &nbsp; &nbsp;
                                    <TextField id="description" label="Test Format" variant="standard" inputRef={test_format} />
                                    <br />
                                    <TextField
                                        id="standard-number"
                                        label="Duration"
                                        type="number"
                                        variant="standard"
                                        inputRef={test_duration}
                                    />
                                    &nbsp; &nbsp; &nbsp; &nbsp;
                                    <TextField id="description" label="Time of Commencement" variant="standard" inputRef={test_time} />
                                    <br /> <br />
                                    <TextField id="date" variant="standard" type="date" inputRef={test_date} />
                                    <TextField id="description" label="Test Description" variant="standard" fullWidth sx={{ m: 1 }} inputRef={test_description} />
                                    <TextField id="link" label="Test Link" variant="standard" fullWidth sx={{ m: 1 }} inputRef={test_link} />
                                    <br />
                                    <TextField id="name" label="FullScreen-Detects" variant="standard" inputRef={fsDetect} />
                                    &nbsp; &nbsp; &nbsp; &nbsp;
                                    <TextField id="description" label="TabSwitch-Detects" variant="standard" inputRef={tsDetect} />
                                    <br /><br />
                                    <Button variant="contained" style={{ backgroundColor: "#6062ff" }} onClick={draftTest}>Create test</Button>
                                </Card>
                            </>
                        }
                    </Grid>
                </Grid>
            </Box>
            {/* <Footer /> */}
        </>
    )
}
