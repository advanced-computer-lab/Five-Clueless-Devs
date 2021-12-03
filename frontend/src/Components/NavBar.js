import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "./NavBar.css";


const Navbar = () => {
  const history = useHistory();
  const [userId, setUser] = useState();

  useEffect(() => {
    setInterval(()=>  setUser(localStorage.getItem('userId')),
    2000);
  }, [])


  return (
    <AppBar position="static" style={{ alignItems: 'flex-start' }}>
      <Toolbar>
        <Button className="admin" color="inherit" onClick={(e) => history.push('/user-details/' + localStorage.getItem("userId"))}>View Profile</Button>
        <Button className="admin" color="inherit" onClick={(e) => history.push('/Reserved-flights')}>View Reservations</Button>
        <Button className="admin" color="inherit" onClick={(e) => history.push('/')}>Search for Flights</Button>

        {userId ? <Button className="admin" color="inherit" onClick={(e) => {
          localStorage.removeItem('userId');
          window.location.reload();
        }}>Logout</Button> : <Button className="admin" color="inherit" onClick={(e) => history.push("/login")}>Login</Button>}
        
        <div className="ayesm">
          <Button color="inherit" onClick={(e) => history.push('/admin-search')}> Admin Panel</Button>
          <Button color="inherit" onClick={(e) => history.push('/flight-schedule')}>Flight Schedule</Button>
          <Button color="inherit" onClick={(e) => history.push('/create-flight')}>Add Flight</Button>
        </div>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;