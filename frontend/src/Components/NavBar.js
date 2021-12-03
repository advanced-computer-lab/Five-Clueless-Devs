import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useHistory } from "react-router";
import "./NavBar.css";


const Navbar = () => {
  const history = useHistory();

  return (
    <AppBar position="static" style={{ alignItems: 'flex-start' }}>
      <Toolbar>
      <Button className="admin" color="inherit" onClick={(e) => history.push('/user-details/' + localStorage.getItem("userId"))}>View Profile</Button>
      <Button className="admin" color="inherit" onClick={(e) => history.push('/Reserved-flights')}>View Reservations</Button>
      <Button className="admin" color="inherit" onClick={(e) => history.push('/search-user')}>Search for Flights</Button>
        <div className="ayesm">
         
          <Button color="inherit" onClick={(e) => history.push('/')}> Admin Panel</Button>
          <Button color="inherit" onClick={(e) => history.push('/flight-schedule')}>Flight Schedule</Button>
          <Button color="inherit" onClick={(e) => history.push('/create-flight')}>Add Flight</Button>
        </div>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;