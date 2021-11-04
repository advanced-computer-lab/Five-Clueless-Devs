import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { BACKEND_URL } from '../API/URLS';



class ViewFlightDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flight: {}
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get(BACKEND_URL+"flights/search"+this.props.match.params.id)
      .then(res => {
        // console.log("Print-ViewFlight-API-response: " + res.data);
        this.setState({
          flight: res.data
        })
      })
      .catch(err => {
        console.log("Error from ViewFlightDetails");
      })
  };

  onDeleteClick (id) {
    axios
      .delete(BACKEND_URL+"flights/deleteFlight"+id)
      .then(res => {
        this.props.history.push("/");
      })
      .catch(err => {
        console.log("Error form ViewFlightDetails_deleteClick");
      })
  };


  render() {

    const flight = this.state.flight;
    let FlightItem = <div>
      <table className="table table-hover table-dark">
        {/* <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead> */}
       /* <tbody>
          <tr>
            <th scope="row">1</th>
            <td>flightId</td>
            <td>{ flight.flightId }</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>from</td>
            <td>{ flight.from }</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>to</td>
            <td>{ flight.to }</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>departureDate</td>
            <td>{ flight.departureDate }</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>arrivalDate</td>
            <td>{ flight.arrivalDate }</td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td>departureTime</td>
            <td>{ flight.departureTime }</td>
          </tr>
          <tr>
            <th scope="row">7</th>
            <td>arrivalTime</td>
            <td>{ flight.arrivalTime }</td>
          </tr>
          <tr>
            <th scope="row">8</th>
            <td>availableEconomy</td>
            <td>{ flight.availableEconomy }</td>
          </tr>
          <tr>
            <th scope="row">9</th>
            <td>availableBusiness</td>
            <td>{ flight.availableBusiness }</td>
          </tr>
          <tr>
            <th scope="row">10</th>
            <td>availableFirst</td>
            <td>{ flight.availableFirst }</td>
          </tr>
          <tr>
            <th scope="row">11</th>
            <td>departureTerminal</td>
            <td>{ flight.departureTerminal }</td>
          </tr>
          <tr>
            <th scope="row">12</th>
            <td>arrivalTerminal</td>
            <td>{ flight.arrivalTerminal }</td>
          </tr>
        </tbody>
      </table>
    </div>

    return (
      <div className="ViewFlight">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <br /> <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Show Flights List
              </Link>
            </div>
            <br />
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Flights' Record</h1>
              <p className="lead text-center">
                  View Flights' Info
              </p>
              <hr /> <br />
            </div>
          </div>
          <div>
            { FlightItem }
          </div>

          <div className="row">
            <div className="col-md-6">
              <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={this.onDeleteClick.bind(this,flight._id)}>Delete Flights</button><br />
            </div>

            <div className="col-md-6">
              <Link to={`/edit-flight/${flight._id}`} className="btn btn-outline-info btn-lg btn-block">
                    Edit Flights
              </Link>
              <br />
            </div>

          </div>
            {/* <br />
            <button type="button" class="btn btn-outline-info btn-lg btn-block">Edit Flight</button>
            <button type="button" class="btn btn-outline-danger btn-lg btn-block">Delete Flight</button> */}

        </div>
      </div>
    );
  }
}

export default ViewFlightDetails;




/*export default function App() {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const handleChange = event => {
       setSearchTerm(event.target.value);
     };
    React.useEffect(() => {
      
    const results = data.filter(flight =>
        flight.toLowerCase().includes(searchTerm)
      );

       axios.get( BACKEND_URL+"flights/search").then(
        result=>{setSearchResults(results)
    }
    ).catch();
     }, [searchTerm]);
   
     return (
       <div className="App">
         <input
           type="text"
           placeholder="Search"
           value={searchTerm}
           onChange={handleChange}
         />
         <ul>
            {searchResults.map(item => (
             <li>{item}</li>
           ))}
         </ul>
       </div>
     );
   }*/









/*export default function ViewFlight(){
    const [flights,setFlights]= React.useState({});
    const[b,setB] = useState(true);

    
useEffect(()=>{


    axios.get( BACKEND_URL+"flights/search").then(
        res=>{setFlights(res.data[0])
            // console.log(flights, 'flolfofl')
        console.log(res.data[0], 'flyyyyy')
    }
    ).catch();
},[])

console.log(flights, 'flolfofl')

function handleButtonClick(){

setB(b);
}

return(
    <div>
    <div>dfghgfdfgh</div>
    {/* flights.map(a=>{b?<button onClick={handleButtonClick}>{a.flightId ,a.from ,a.to, a.departureDate, a.arrivalDate, a.departureTime, a.arrivalTime,
        a.availableEconomy, a.availableBusiness, a.availableFirst, a.arrivalTerminal, a.departureTerminal
    }</button>:<button onClick={handleButtonClick}>{a.username}</button>}) *///}

    /*{Object.keys(flights).map((detail, i) => {return (<div> {detail} :  {flights[detail]} </div>)})}
    </div>
);
    
} */
