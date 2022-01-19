import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../logo.jpg';
// import Link from '@mui/material/Link';
import { Link, useHistory } from "react-router-dom"

const pages = ['Products', 'Pricing', 'Blog', 'More Info', 'ETC'];

const Navbar = () => {
  const history = useHistory()

  const [anchorEl_1, setAnchorEl_1] = React.useState(null);
  const open_1 = Boolean(anchorEl_1);
  const handleClick_1 = (event) => {
    setAnchorEl_1(event.currentTarget);
  };
  const handleClose_1 = () => {
    setAnchorEl_1(null);
  };

  const [anchorEl_2, setAnchorEl_2] = React.useState(null);
  const open_2 = Boolean(anchorEl_2);
  const handleClick_2 = (event) => {
    setAnchorEl_2(event.currentTarget);
  };
  const handleClose_2 = () => {
    setAnchorEl_2(null);
  };
  const student_login = () => {history.push('/student-login')}
  const organization_login = () =>{history.push('/login')}
  const student_signup = () => { history.push('/student-sign-up'); }
  const organization_signup = () => { history.push('/sign-up'); }
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
              Invigilate
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <IconButton  sx={{ p: 0 }}>
                  <Button id="Login" variant="outlined" style={{ color: "#6062ff", marginRight: "1rem" }} onClick={handleClick_2}>Login</Button>
                  <Menu
                    id="Login"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl_2}
                    open={open_2}
                    onClose={handleClose_2}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                  >
                    <MenuItem onClick={student_login}>Student login</MenuItem>
                    <MenuItem onClick={organization_login}>Organization Login</MenuItem>
                  </Menu>
                  <Button id="Sign-Up" variant="contained" style={{ backgroundColor: "#6062ff" }} onClick={handleClick_1}>Sign up</Button>
                  <Menu
                    id="Sign-Up"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl_1}
                    open={open_1}
                    onClose={handleClose_1}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                  >
                    <MenuItem onClick={student_signup}>Student Signup</MenuItem>
                    <MenuItem onClick={organization_signup}>Organization Signup</MenuItem>
                  </Menu>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>

  );
};
export default Navbar;