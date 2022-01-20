import * as React from 'react';
import { useRef,useState } from 'react';
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
import Img from '../o2.jpg'

const theme = createTheme();

export default function Signup() {
    const [currentUser, setCurrentUser] = useState();
    const OrganizationNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    var OrganizationName="";
    var email="";
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const [task,setTask] = useState(false);
    const history = useHistory();
    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			alert("Password does not Match");
			setLoading(false);
			return;
		}
        try{
            await signup(emailRef.current.value,passwordRef.current.value)
            OrganizationName = OrganizationNameRef.current.value;
            email = emailRef.current.value;
            await changecurrentUser();
            setTask(true);
            history.push('/dashboard')
        } catch(e){
            alert("Failed to create an account")
            console.log(e)
        }
    }
    function changecurrentUser(){
        console.log(auth);
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
            console.log(user)
        })
        return unsubscribe;
    }

    if(task){
        const OrganizationRef = firebase.database().ref('Organizations/'+currentUser.uid)
        console.log(OrganizationRef)
        const Organization_data = {
            Organization_Name: OrganizationNameRef.current.value,
            Email: emailRef.current.value
        }
        try{
            OrganizationRef.set(Organization_data);
        }catch(e){
            console.log(e);
        }
    }
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }} >
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                <img src = {Img} style={{height: "100%"}}></img> 
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
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }} style={{color: "white"}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="OrganizationName"
                                label="Organization Name"
                                inputRef={OrganizationNameRef}
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
                                style={{bColor: "white !important"}}
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
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={loading}
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