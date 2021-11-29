import { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Pages/Home.Page';
import Test from './Pages/Test.page';
import CreateFlight from './Components/CreateFlight';
import CreateUser from './Components/CreateUser'
import SearchFlight from './Components/SearchFlight';
import ViewFlightDetails from './Components/ViewFlightDetails';
import UpdateFlight from './Components/UpdateFlight';
import EditUser from './Components/EditUser';
import SearchFlightCriteria from './Components/SearchFlightCriteria';
import Navbar from './Components/NavBar';
import FlightSchedule from './Components/FlightSchedule';
import SearchFlightUser from './Components/SearchFlightUser';

function App() {

  return (
    <div className="App">

      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={SearchFlightCriteria} />


          <Route path='/create-flight' component={CreateFlight} />
          <Route path='/search-user' component={SearchFlightUser} />
          <Route path='/update-flight/:id' component={UpdateFlight} />
          {/* <Route path='/search' component={SearchFlight} /> */}
          <Route path='/details/:id' component={ViewFlightDetails} />
          <Route path='/search' component={SearchFlightCriteria} />
          <Route path='/flight-schedule' component={FlightSchedule} />

          <Route path='/edit-user/:id' component={EditUser} />
          <Route path='/create-user' component={CreateUser} />
         

        </Switch>
      </Router>
    </div>
  );
}

export default App;
