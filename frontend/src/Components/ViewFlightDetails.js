import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { BACKEND_URL } from '../API/URLS';


const ViewFlightDetails = () => {

  const history = useHistory();
  const [flight, setFlight] = useState({
    flightId: '',
    from: '',
    to: '',
    departureDate: '',
    arrivalDate: '',
    departureTime: '',
    arrivalTime: '',
    availableEconomy: '',
    availableBusiness: '',
    availableFirst: '',
    arrivalTerminal: '',
    departureTerminal: ''
  });
  let { id } = useParams();

  useEffect(() => {
    console.log("Print id: " + { id });
    axios
      .get(BACKEND_URL + "flights/search?flightId=" + id)
      .then(res => {
        console.log(res.data);
        setFlight(res.data[0] || {});
      })
      .catch(err => {
        console.log(err);
      })
  }
    , []);



  const onDeleteConfirm = () => {
    axios
      .delete(BACKEND_URL + "flights/deleteFlight?flightId=" + id)
      .then(res => {
        history.push("/search");
      })
      .catch(err => {
        console.log("Error form ViewFlightDetails_deleteClick");
        console.log(err);
      })
  };
  const [showConfirm, setConfirm] = useState(false);
  const setConfirmButton = () => {
    setConfirm(true)
    setDelete(false)
  };

  const [showDelete, setDelete] = useState(true);
  const setDeleteButton = () => {
    showDelete(false)
  };
  

  return (
    <div className="ViewFlight">
      <div className="container">
        <div className="row">
          <div className="col-md-10 m-auto">
            <br /> <br />
            <Link to="/search/:id" className="btn btn-outline-warning float-left">
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
          <div>
            <table className="table table-hover table-dark">
              {/* <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead> */}
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>flightId</td>
                  <td>{flight.flightId}</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>from</td>
                  <td>{flight.from}</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>to</td>
                  <td>{flight.to}</td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>departureDate</td>
                  <td>{flight.departureDate}</td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>arrivalDate</td>
                  <td>{flight.arrivalDate}</td>
                </tr>
                <tr>
                  <th scope="row">6</th>
                  <td>departureTime</td>
                  <td>{flight.departureTime}</td>
                </tr>
                <tr>
                  <th scope="row">7</th>
                  <td>arrivalTime</td>
                  <td>{flight.arrivalTime}</td>
                </tr>
                <tr>
                  <th scope="row">8</th>
                  <td>availableEconomy</td>
                  <td>{flight.availableEconomy}</td>
                </tr>
                <tr>
                  <th scope="row">9</th>
                  <td>availableBusiness</td>
                  <td>{flight.availableBusiness}</td>
                </tr>
                <tr>
                  <th scope="row">10</th>
                  <td>availableFirst</td>
                  <td>{flight.availableFirst}</td>
                </tr>
                <tr>
                  <th scope="row">11</th>
                  <td>departureTerminal</td>
                  <td>{flight.departureTerminal}</td>
                </tr>
                <tr>
                  <th scope="row">12</th>
                  <td>arrivalTerminal</td>
                  <td>{flight.arrivalTerminal}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
          </div>

          <div className="col-md-6">
            <Link to={`/update-flight/${id}`} className="btn btn-outline-info btn-lg btn-block">
              Edit Flights
            </Link>
            <br />
            {showDelete?   <button onClick={setConfirmButton}>Delete </button>:null}
            {showConfirm? <button onClick={onDeleteConfirm}>Confirm</button>:null}
            <div className="App">
             
          </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ViewFlightDetails;