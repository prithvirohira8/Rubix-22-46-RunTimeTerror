import React from 'react'
import Navbar from './Navbar'
import Typography from '@mui/material/Typography';
import {Link, useHistory} from "react-router-dom"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Footer from '../Footer';
import Img from '../o1.jpg'
export default function Home_Page() {
  
  return (
    <>
      <Navbar />
      <br /><br />
      <div style={{width: "50%",margin: "0 auto"}}>
      <Typography variant="h2" component="h2" style={{color: "white"}}>
        <span style={{color: "#6062ff"}}>Invigilate</span> A Platform for conducting proctured online examinations
      </Typography>;
      </div>
      <div style={{width: "60%",margin: "0 auto"}}><img src={Img} ></img></div>
      <Footer />
    </>
  )
}

