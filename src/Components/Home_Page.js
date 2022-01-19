import React from 'react'
import Navbar from './Navbar'
import Typography from '@mui/material/Typography';
import {Link, useHistory} from "react-router-dom"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
export default function Home_Page() {
  
  return (
    <>
      <Navbar />
      <br /><br />
      <div style={{width: "50%",margin: "0 auto"}}>
      <Typography variant="h2" component="h2" style={{color: "white"}}>
        <span style={{color: "#6062ff"}}>Proctor It</span> A Platform for conducting proctured online examinations
      </Typography>;
      </div>
    </>
  )
}

