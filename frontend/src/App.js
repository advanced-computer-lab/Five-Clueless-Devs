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
import SearchFlight from './Components/SearchFlight';
import ViewFlightDetails from './Components/ViewFlightDetails';
import UpdateFlight from './Components/UpdateFlight';
import SearchFlightCriteria from './Components/SearchFlightCriteria';
import Navbar from './Components/NavBar';
import FlightSchedule from './Components/FlightSchedule';

function App() {

  return (
    <div className="App">

      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={SearchFlightCriteria} />


          <Route path='/create-flight' component={CreateFlight} />
          <Route path='/update-flight/:id' component={UpdateFlight} />
          {/* <Route path='/search' component={SearchFlight} /> */}
          <Route path='/details/:id' component={ViewFlightDetails} />
          <Route path='/search' component={SearchFlightCriteria} />
          <Route path='/flight-schedule' component={FlightSchedule} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
