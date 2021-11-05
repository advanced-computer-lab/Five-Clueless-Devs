import React, { Component, useEffect, useState } from 'react';
import { Link, useParams, useHistory} from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { BACKEND_URL } from '../API/URLS';


const UpdateFlight = () => {
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


    const getFlight = () => {
        console.log("Print id: " + { id });
        axios
            .get(BACKEND_URL + "flights/search?flightId=" + id)
            .then(res => {
                console.log(res.data);
                setFlight(res.data[0]);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const onChange = (e) => {
        setFlight({ ...flight, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        axios
            .put(BACKEND_URL + 'flights/update?flightId=' + id, flight)
            .then(res => {
                console.log(res.data);
                history.push('/search');
            })
            .catch(err => {
                console.log(err);
            })
    };

    useEffect(() => {
        getFlight();
    }, []);


    return (
        <div className="update Flight">
            <div className="container">
                <div className="row">

                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">update Flight</h1>
                        <p className="lead text-center">
                            update flight info
                        </p>

                        <form noValidate onSubmit={onSubmit}>
                            <div className='form-group'>
                                <label> Flight ID: </label>
                                <input
                                    type='text'
                                    placeholder='Flight ID'
                                    name='flightId'
                                    className='form-control'
                                    value={flight.flightId}
                                    onChange={(e) => onChange(e)}
                                />

                            </div>


                            <div className='form-group'>
                                <label> From: </label>
                                <input
                                    type='text'
                                    placeholder='From'
                                    name='from'
                                    className='form-control'
                                    value={flight.from}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>

                            <div className='form-group'>
                                <label> To: </label>
                                <input
                                    type='text'
                                    placeholder='To'
                                    name='to'
                                    className='form-control'
                                    value={flight.to}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>


                            <div className='form-group'>
                                <label> Departure Time: </label>
                                <input
                                    type='time'
                                    placeholder='Departure Time'
                                    name='departureTime'
                                    className='form-control'
                                    value={flight.departureTime}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>
                            <div className='form-group'>
                                <label> Arrival Time: </label>
                                <input
                                    type='time'
                                    placeholder='Arrival Time'
                                    name='arrivalTime'
                                    className='form-control'
                                    value={flight.arrivalTime}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>
                            <div className='form-group'>
                                <label> Economy Class Seats: </label>
                                <input
                                    type='text'
                                    placeholder='Economy Class Seats'
                                    name='availableEconomy'
                                    className='form-control'
                                    value={flight.availableEconomy}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>
                            <div className='form-group'>
                                <label> Business Class Seats: </label>
                                <input
                                    type='text'
                                    placeholder='Business Class Seats'
                                    name='availableBusiness'
                                    className='form-control'
                                    value={flight.availableBusiness}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>
                            <div className='form-group'>
                                <label> First Class Seats: </label>
                                <input
                                    type='text'
                                    placeholder='First Class Seats'
                                    name='availableFirst'
                                    className='form-control'
                                    value={flight.availableFirst}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>
                            <div className='form-group'>
                                <label> Departure Terminal: </label>
                                <input
                                    type='text'
                                    placeholder='Departure Terminal'
                                    name='departureTerminal'
                                    className='form-control'
                                    value={flight.departureTerminal}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>
                            <div className='form-group'>
                                <label> Arrival Terminal: </label>
                                <input
                                    type='text'
                                    placeholder='Arrival Terminal'
                                    name='arrivalTerminal'
                                    className='form-control'
                                    value={flight.arrivalTerminal}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>
                            <div className='form-group'>
                                <label> Departure Date: </label>
                                <input
                                    type='date'
                                    placeholder='Departure Date'
                                    name='departureDate'
                                    className='form-control'
                                    value={flight.departureDate.substring(0,10)}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>

                            <div className='form-group'>
                                <label> Arrival Date: </label>
                                <input
                                    type='date'
                                    placeholder='Arrival Date'
                                    name='arrivalDate'
                                    className='form-control'
                                    value={flight.arrivalDate.substring(0,10)}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>

                            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update Flight</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateFlight;
