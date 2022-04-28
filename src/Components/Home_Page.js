import React from 'react'
import Navbar from './Navbar'
import Typography from '@mui/material/Typography';
import { Link, useHistory } from "react-router-dom"
import Menu from '@mui/material/Menu';
import "../css/home.scss"
import Footer from '../Footer';
import Img from '../o1.jpg'
import exam from '../images/exam.svg'
import Cards from "./Cards"
export default function Home_Page() {

  return (
    <>
      <Navbar />
      <br /><br />
      <div style={{ width: "50%", margin: "90px 76px", float: "right" }}>
        <Typography variant="h2" component="h2" style={{ color: "white" }}>
          <p><span style={{ color: "#6062ff" }}>Invigilate</span></p>
          <p style={{ fontSize: "45px" }}>Online Proctoring system
            <span class="blink">|</span></p>
        </Typography>
      </div>
      <div style={{
        position: "absolute", top: "50%", left: "34%", transform:
          "translate(-50%,-50%)"
      }}><img width="60%" src={exam} ></img></div>
      <section />

      <Cards />
      <Footer />
    </>
  )
}

