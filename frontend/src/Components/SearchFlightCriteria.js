import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../API/URLS';
import { render } from 'react-dom';
import FlightCard from './FlightCard';

const SearchFlightCriteria = ({ location }) => {
  // const history = useHistory();
  // useState hooks for input and language

  const [flightRes, setResult] = useState([]);
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

  useEffect(() => {
    axios
      .get(BACKEND_URL + "flights/search?")
      .then(res => {
        console.log(res.data);
        setResult(res.data);
        console.log(flightRes);

      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  const onChange = (e) => {
    setFlight({ ...flight, [e.target.name]: e.target.value });
    console.log(flight);
  };

  // function for handling form submit
  const submitAction = (e) => {
    const usp = new URLSearchParams(flight);
    let keysForDel = [];
    usp.forEach((value, key) => {
      if (value == '') {
        keysForDel.push(key);
      }
    });

    keysForDel.forEach(key => {
      usp.delete(key);
    });
    console.log(usp.toString());
    // prevents default, so page won't reload on form submit

    e.preventDefault();
    axios
      .get(BACKEND_URL + "flights/search?" + usp.toString())
      .then(res => {
        console.log(res.data);
        setResult(res.data);
        console.log(flightRes);

      })
      .catch(err => {
        console.log(err);
      })

  };

  return (
    <>

      <div className='bg-dark text-light'>
        <div className='container pt-5' style={{ height: '100vh' }}>
          <h1 className="display-4 text-center">Search for flights</h1>


          <form onSubmit={submitAction} className='mt-5'>
            <div className='input-group'>
              <div className='form-group'>
                <label> Flight ID: </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Flight ID'
                  name="flightId"
                  value={flight.flightId}
                  onChange={(e) => onChange(e)}
                />


                <label> Origin Country: </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Origin Country'
                  name="from"
                  value={flight.from}
                  onChange={(e) => onChange(e)}
                />
                <label> Destination Country: </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Destination Country'
                  name="to"
                  value={flight.to}
                  onChange={(e) => onChange(e)}
                />


                <label> Departure Date: </label>
                <input
                  type='date'
                  className='form-control'
                  placeholder='Departure Date'
                  name="departureDate"
                  value={flight.departureDate}
                  onChange={(e) => onChange(e)}
                />
                <label> Arrival Date: </label>
                <input
                  type='date'
                  className='form-control'
                  placeholder='Arrival Date'
                  name="arrivalDate"
                  value={flight.arrivalDate}
                  onChange={(e) => onChange(e)}
                />
                <label> Departure Time: </label>
                <input
                  type='time'
                  className='form-control'
                  placeholder='Departure Time'
                  name="departureTime"
                  value={flight.departureTime}
                  onChange={(e) => onChange(e)}
                />
                <label> Arrival Time: </label>
                <input
                  type='time'
                  className='form-control'
                  placeholder='Arrival Time'
                  name="arrivalTime"
                  value={flight.arrivalTime}
                  onChange={(e) => onChange(e)}
                />


                <label> Economy Seats: </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Economy Seats'
                  name="availableEconomy"
                  value={flight.availableEconomy}
                  onChange={(e) => onChange(e)}
                />
                <label> Business Seats: </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Business Seats'
                  name="availableBusiness"
                  value={flight.availableBusiness}
                  onChange={(e) => onChange(e)}
                />
                <label> FirstClass Seats: </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='First Class Seats'
                  name="availableFirst"
                  value={flight.availableFirst}
                  onChange={(e) => onChange(e)}
                />


                <label> Arrival Terminal: </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Arrival Terminal'
                  name="arrivalTerminal"
                  value={flight.arrivalTerminal}
                  onChange={(e) => onChange(e)}
                />
                <label> Departure Terminal: </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Departure Terminal'
                  name="departureTerminal"
                  value={flight.departureTerminal}
                  onChange={(e) => onChange(e)}
                />
             

              <div className='input-group-append'>
                <button className='btn btn-primary' type='submit'>
                  Search
                </button>
                </div>
              <div className="list">
                {flightRes.map((flight, k) =>
                  <FlightCard flight={flight} key={k} />
                )}
              </div>

              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SearchFlightCriteria;