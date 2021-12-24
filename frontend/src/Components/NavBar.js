import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "./NavBar.css";


const Navbar = () => {
  const history = useHistory();
  const [userId, setUser] = useState();

  useEffect(() => {
    setInterval(() => {
      setUser(JSON.parse(localStorage.getItem('user'))?._id);
      func();
    },
      2000);


  }, [])

  const [color, setColor] = useState('#596EB3');

  const func = () => {
    if (window.location.href == "http://localhost:3000/") {
      setColor('#A48184')
    }
    else {
      setColor('#A48184')
    }
  }




  return (

    <AppBar position="static" style={{ alignItems: 'flex-start', background:  color , }}>

      <Toolbar >

        {<img style={{ width: '35px', marginRight: '5px' }} src="https://img.icons8.com/fluency-systems-regular/48/000000/air-pilot-hat.png" />}
        <p style={{ color: '#59B39E', fontWeight: 'bolder', fontSize: '30px', marginBottom: '4px', marginRight: '300px', }}>Clueless Pilots</p>
        {userId ? <Button className="admin" color="inherit" onClick={(e) => history.push('/user-details/' + JSON.parse(localStorage.getItem('user'))?._id)}>View Profile</Button> : null}
        {userId ? <Button className="admin" color="inherit" onClick={(e) => history.push('/Reserved-flights')}>View Reservations</Button> : null}
        <Button className="admin" color="inherit" onClick={(e) => history.push('/')}>Search for Flights</Button>

        {userId ? <Button className="admin" color="inherit" onClick={(e) => {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          history.push('/');
        }}>Logout</Button> : <Button className="admin" color="inherit" onClick={(e) => history.push("/login")}>Login</Button>}


        <div className="ayesm">
          {userId == 1 ? <Button color="inherit" onClick={(e) => history.push('/admin-search')}> Admin Panel</Button> : null}
          {userId == 1 ? <Button color="inherit" onClick={(e) => history.push('/flight-schedule')}>Flight Schedule</Button> : null}
          {userId == 1 ? <Button color="inherit" onClick={(e) => history.push('/create-flight')}>Add Flight</Button> : null}
        </div>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;