import * as React from 'react';
import { useRef, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase";
import firebase from "../firebase";
import { useHistory } from 'react-router-dom';
import Webcam from 'react-webcam';

const theme = createTheme();

export default function Sttudent_Signup() {
    const [currentUser, setCurrentUser] = useState();
    const StudentNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const [task, setTask] = useState(false);
    const [Show_webcam, setShow_webcam] = useState(true);
    const webRef = useRef(null);
    const [user_pic, setUser_pic] = useState();
    const history = useHistory();

    const snapshot = () => {
        setTimeout(() => {
            console.log(webRef.current.getScreenshot())
            console.log(webRef.current)
            setUser_pic(webRef.current.getScreenshot())
            setShow_webcam(false);
        }, 5000);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            alert("Password does not Match");
            setLoading(false);
            return;
        }
        try {
            await signup(emailRef.current.value, passwordRef.current.value)
            await changecurrentUser();
            setTask(true);
            history.push('/student-dashboard')
        } catch (e) {
            alert("Failed to create an account")
            console.log(e)
        }
    }
    function changecurrentUser() {
        console.log(auth);
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
            console.log(user)
        })
        return unsubscribe;
    }

    if (task) {
        const StudentRef = firebase.database().ref('Students/' + currentUser.uid)
        console.log(StudentRef)
        const Student_data = {
            Student_Name: StudentNameRef.current.value,
            Email: emailRef.current.value,
            Photo: user_pic,
            type: 'student',
        }
        try {
            StudentRef.set(Student_data);
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }} >
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7}>
                    <br /> <br />
                    {Show_webcam && <>&nbsp; &nbsp; &nbsp; &nbsp;<Webcam ref={webRef} /></>}
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }} style={{ color: "white" }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="StudentName"
                                label="Student Name"
                                inputRef={StudentNameRef}
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                type="email"
                                inputRef={emailRef}
                                autoComplete="email"
                                autoFocus
                                style={{ bColor: "white !important" }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                inputRef={passwordRef}
                                id="password"
                                autoComplete="current-password"

                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Confirm Password"
                                type="password"
                                inputRef={passwordConfirmRef}
                                id="Confirmpassword"
                                autoComplete="current-password"

                            />
                            <Button onClick={snapshot} variant="contained">Click a snap</Button>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={loading}
                                style={{ backgroundColor: "#141718" }}
                            >
                                Sign Up
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Already have an account? Sign In"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}