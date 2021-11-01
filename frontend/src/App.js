import { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './Pages/Home.Page';
import Test from './Pages/Test.page';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/"
            component={Home}
          />
          <Route path="/test"
            component={Test}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
