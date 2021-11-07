import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useHistory } from "react-router";


const Navbar = () => {
    const history = useHistory();

    return ( 
        <AppBar position="static" style={{alignItems:'flex-start'}}>
        <Toolbar>
          <Button color="inherit" onClick={(e) => history.push('/')}> Admin Panel</Button> 
          <Button color="inherit" onClick={(e) => history.push('/flight-schedule')}>Flight Schedule</Button>
          <Button color="inherit" onClick={(e) => history.push('/create-flight')}>Add Flight</Button>
        </Toolbar>
      </AppBar>
     );
}
 
export default Navbar;