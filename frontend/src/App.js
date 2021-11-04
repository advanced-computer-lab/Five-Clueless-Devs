import logo from './logo.svg';
import './App.css';
<<<<<<< Updated upstream

=======
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './Pages/Home.Page';
import Test from './Pages/Test.page';
import CreateFlight from './Components/CreateFlight';
import UpdateFlight from './Components/updateFlight';
>>>>>>> Stashed changes
function App() {
  return (
    <div className="App">
<<<<<<< Updated upstream
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
=======
      <Router>
        <Switch>
          <Route exact path="/"
            component={Home}
          />
          <Route path="/test"
            component={Test}
          />
           <Route path='/create-flight' component={CreateFlight} />
           <Route path='/update-flight' component={UpdateFlight} />
        </Switch>
      </Router>
>>>>>>> Stashed changes
    </div>
  );
}

export default App;
